let faker = require('faker')
import DashboardPage from "./DashboardPage";
let dashboardPage = new DashboardPage();

export default class TemplatePage {
    categoryName = faker.commerce.productName()
    rndIcon = Math.floor(Math.random() * 39)

    addCategoryBtn() {
        return cy.get('div[class=upload-pres]')
    };

    categoryNameInput() {
        return dashboardPage.categoryNameInput()
    };

    saveCategoryBtn() {
        return dashboardPage.saveCategoryBtn()
    };

    saveIconBtn() {
        return dashboardPage.saveIconBtn()
    };

    categoryItems() {
        return dashboardPage.categoryItems()
    };

    categoryIconEdit() {
        return dashboardPage.categoryIconEdit()
    };

    categoryIcon() {
        return dashboardPage.categoryIcon()
    };
}
