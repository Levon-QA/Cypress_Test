export default class DashboardPage {

    memberLinks = ["Slides", "Team Presentations", "My Presentations", "Activity"]
    ownerLinks = this.memberLinks.slice(0, 2).concat(this.memberLinks.slice(2 + 1, this.memberLinks.length))

    logoIcon() {
        return cy.get('[class="sc-nav-logo"]')
    };

    navigationLinks() {
        return cy.get('a ~ [class="sc-nav-links"] li')
    };

    categoryMeatballsMenu() {
        return cy.get('.tooltip-for-category > div')
    };

    getDashboard() {
        return cy.get('[id="dashboard"]')
    };

    moreSlidesBtn() {
        return cy.get('.sc-center-slides > div:nth-child(2) > a')
    }

    categoryNameInput() {
        return cy.get('input[name="name"]')
    };

    saveCategoryBtn() {
        return cy.get('button[class="btn btn-lightblue"]')
    };

    saveIconBtn() {
        return cy.get('a[class="btn btn-lightblue"]')
    };

    categoryItems() {
        return cy.get('div[class*="category__cell"]')
    };

    categoryIconEdit() {
        return cy.get('[class="ico-edit"]')
    };

    categoryIcon() {
        return cy.get('[class="categories-ico"]')
    };

    deletePresentationModal() {
        return cy.get('[class*="ReactModal"] > [class="sc-modal-content"]')
    };

    deleteSlidesModal() {
        return this.deletePresentationModal()
    };

    searchInput() {
        return cy.get('[class="search-input"]')
    };

    searchBtn() {
        return cy.get('[class="btn search-btn"]')
    };
}
