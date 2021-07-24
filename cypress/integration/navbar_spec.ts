/* describe("My First Test", () => {
  it("Gets, types and asserts", () => {
    cy.visit("https://example.cypress.io")

    cy.contains("type").click()

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should("include", "/commands/actions")

    // Get an input, type into it and verify that the value has been updated
    cy.get(".action-email").type("fake@email.com").should("have.value", "fake@email.com")
  })
}) */

describe("The Navbar", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:3000") // change URL to match your dev URL
  })

  it("Coffee", () => {
    cy.get("[data-cy='Coffees']")

    /* cy.get("[data-cy='Coffees']").click()
    cy.url().should("include", "/coffees") */
  })

  it("Profil", () => {
    cy.get("[data-cy='Profile']")
  })

  it("Home", () => {
    cy.get("[data-cy='Home']")
  })
})
