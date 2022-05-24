import LoginPage from "../../../pages/LoginPage";
import DashboardPage from "../../../pages/DashboardPage";

let loginPage = new LoginPage()
let dashboardPage = new DashboardPage()
let user = Cypress.env()
let owner_email = user.SC_EMAIL_TEAM_OWNER
let member_email = user.SC_EMAIL_TEAM_MEMBER
let admin_email = user.SC_EMAIL_ADMIN
let password = user.SC_PASSWORD

describe('Login tests', () => {

    beforeEach(() => {
        cy.seedDatabaseWithCleanData()
        cy.visit('/')
    });
    [
        {
            user: {
                role: 'owner',
                email: owner_email,
                navLinks: {
                    length: 3,
                    items: dashboardPage.ownerLinks
                },
                meatballMenus: {
                    length: 3
                }
            }
        },
        {
            user: {
                role: 'member',
                email: member_email,
                navLinks: {
                    length: 4,
                    items: dashboardPage.memberLinks
                },
                meatballMenus: {
                    length: 0
                }
            }
        },
        {
            user: {
                role: 'admin',
                email: admin_email,
                navLinks: {
                    length: 4,
                    items: dashboardPage.memberLinks
                },
                meatballMenus: {
                    length: 3
                }
            }
        },
    ].forEach((test) => {

        it(`${test.user.role} | Login`, () => {
            dashboardPage.getDashboard()
                .should('not.exist')
            dashboardPage.logoIcon()
                .should('not.exist')
            loginPage.getEmailField()
                .should('be.visible').type(test.user.email)
            loginPage.getPasswordField()
                .should('be.visible').type(password)
            loginPage.getLoginButton()
                .should('be.visible').click()
            dashboardPage.logoIcon()
                .should('be.visible')
        })

        it(`${test.user.role} | Login and check elements in the menu`, () => {
            cy.login(test.user.role)
            cy.visit('/dashboard')
            dashboardPage.getDashboard()
                .should('be.visible')
            dashboardPage.navigationLinks()
                .should('have.length', test.user.navLinks.length).each((el) => {
                cy.wrap(el)
                    .should('have.text', test.user.navLinks.items[el.index()])
            })
            dashboardPage.categoryMeatballsMenu().should('have.length', test.user.meatballMenus.length)
        })

        it(`${test.user.role} | Login with empty credentials`, () => {
            loginPage.getErrorMessages()
                .should('have.length', 0)
            loginPage.getLoginButton().click()
            loginPage.getErrorMessages()
                .should('have.length', 2).each((el) => {
                cy.wrap(el)
                    .should('have.text', loginPage.requiredMsg)
            })
        })
    });
});
