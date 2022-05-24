import '@percy/cypress';
import 'cypress-file-upload';

Cypress.Commands.add("login", (role = "owner") => {
    cy.request({
        method: "POST",
        url: Cypress.env("SC_API_URL"),
        body: {
            query:
                "mutation login($email: String!, $password: String!, $timezoneOffset: Int) { login(email: $email, password: $password, timezoneOffset: $timezoneOffset) }",
            variables: {
                timezoneOffset: -60,
                email: role === "owner" ? Cypress.env("SC_EMAIL_TEAM_OWNER") : role === "member" ? Cypress.env("SC_EMAIL_TEAM_MEMBER") : Cypress.env("SC_EMAIL_ADMIN"),
                password: Cypress.env("SC_PASSWORD")
            }
        }
    }).then(resp => {
        localStorage.setItem("jwtToken", resp.body.data.login)
    })
})

Cypress.Commands.add("addCategory", (name) => {
    cy.request({
        method: "POST",
        url: Cypress.env("SC_API_URL"),
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: {
            operationName: "createPresentation",
            query:
                "mutation createPresentation($data: PresentationInput!) {createPresentation(data: $data) {id name __typename }}",
            variables: {
                data: {
                    icon: "Presentation",
                    name: name
                }
            }
        }
    }).then(resp => {
        expect(resp.status).to.eq(200)
        return resp.body
    })
})

Cypress.Commands.add("seedDatabaseWithCleanData", () => {
    cy.request(Cypress.env("SC_SEED_URL"))
})


















