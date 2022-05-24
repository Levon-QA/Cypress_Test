import ActivityPage from "../../pages/ActivityPage";
import DashboardPage from "../../pages/DashboardPage";

let activityPage = new ActivityPage()
let dashboardPage = new DashboardPage()

describe('Activity page items visual tests', () => {

    beforeEach(() => {
        cy.seedDatabaseWithCleanData()
    });

    after(() => {
        cy.seedDatabaseWithCleanData()
    });
    [
        {
            user:
                {
                    role: 'owner'
                }
        },
        {
            user:
                {
                    role: 'member'
                }
        },
        {
            user:
                {
                    role: 'admin'
                }
        }
    ].forEach(test => {

        it(`${test.user.role} | Check shared items in activity page rendered correctly`, () => {
            test.user.role === "member" ? cy.login('member') : cy.log("Owner already logged in")
            cy.login(test.user.role)
            cy.shareFirstPresentationWithAll()
            cy.visit('/activity')
            activityPage.activityCards().should('be.visible')
            cy.percySnapshot(`${test.user.role}'s_full_activity_page`, )
            activityPage.activityCards().eq(0).click()
            cy.percySnapshot(`${test.user.role}'s_full_activity_page_collapsed`, )
        });
    });

    [
        {
            user:
                {role: 'owner'}
        }
    ].forEach((test) => {

        it(`${test.user.role} | Check searched items in activity page rendered correctly`, () => {
            const invalidCredential = 'first'
            const validCredential = 'image'
            cy.login(test.user.role)
            cy.visit('/dashboard')
            dashboardPage.searchInput().type(invalidCredential)
            dashboardPage.searchBtn().click()
            cy.visit('/activity')
            cy.reload()
            cy.contains(invalidCredential)
            cy.percySnapshot(`${test.user.role}'s_activity_page_searched_item_without_result`)
            cy.login('member')
            cy.visit('/dashboard')
            dashboardPage.searchInput().type(validCredential)
            dashboardPage.searchBtn().click()
            cy.login()
            cy.visit('/activity')
            cy.contains(validCredential)
            cy.percySnapshot(`${test.user.role}'s_activity_page_searched_item_with_result`)
            activityPage.activityCards().eq(0).click()
            cy.percySnapshot(`${test.user.role}'s_activity_page_searched_item_result_image`)
        });
    });
});
