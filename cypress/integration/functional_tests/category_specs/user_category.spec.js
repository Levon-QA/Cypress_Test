import DashboardPage from "../../../pages/DashboardPage";
import TemplatePage from "../../../pages/TemplatePage";
import "..//cypress/support/commands.js";

let dashboardPage = new DashboardPage()
let templatePage = new TemplatePage()

describe('User category tests', () => {

    beforeEach(() => {
        cy.seedDatabaseWithCleanData()
    });

    after(() => {
        cy.seedDatabaseWithCleanData()
    });
    [
        {
            user:
                {role: 'owner',}
        },
        {
            user:
                {role: 'admin',}
        }
    ].forEach(test => {

        it(`${test.user.role} | Add new category and check`, () => {
            cy.login(test.user.role)
            cy.visit('/')
            let categoryName = templatePage.categoryName
            let rnd = templatePage.rndIcon
            dashboardPage.moreSlidesBtn().click()
            templatePage.addCategoryBtn().click()
            templatePage.categoryNameInput().type(categoryName)
            templatePage.categoryIconEdit().click()
            templatePage.categoryIcon().eq(rnd).find('input').click({force: true}).then((el) => {
                cy.wrap(el.attr('value')).as('iconName')
            })
            templatePage.saveIconBtn().click()
            templatePage.saveCategoryBtn().click()
            templatePage.categoryItems()
                .should('have.length', 4).eq(1)
                .should('have.text', categoryName)
            cy.get('@iconName').then((iconName) => {
                templatePage.categoryItems()
                    .eq(1)
                    .find('svg[class]')
                    .invoke('attr', 'class')
                    .should('contain', iconName.replace(/\s/g, '').toLowerCase())
            });
        });
    });
});
