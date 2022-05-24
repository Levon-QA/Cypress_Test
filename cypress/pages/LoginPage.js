export default class LoginPage {
    requiredMsg = 'This field is required'

    getEmailField() {
        return cy.get('input[name="email"]')
    };

    getPasswordField() {
        return cy.get('input[name="password"]')
    };

    getLoginButton() {
        return cy.get('button[type="button"]')
    };

    getErrorMessages() {
        return cy.get('[class="sc-form-error"]')
    };

}
