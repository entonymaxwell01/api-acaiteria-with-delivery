import { faker } from '@faker-js/faker';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })\



Cypress.Commands.add('createUser', () => {
    cy.request({
        method: 'POST',
        url: '/user/register',
        body: {
            name: faker.person.firstName(),
            cpf: faker.number.int(),
            password: faker.internet.password(),
            email: faker.internet.email(),
            phone: faker.phone.number()
        }
    })

});

Cypress.Commands.add('login', (email,password) => {
    cy.request({
        method: 'POST',
        url: '/user/login',
        body: {
            email: email,
            password: password,
        },
        failOnStatusCode: false
    })
});