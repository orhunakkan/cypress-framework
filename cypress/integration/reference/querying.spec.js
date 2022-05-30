/// <reference types="cypress" />

// cy.get()
// To query for the button, use the cy.get() command.
describe("Querying", () => {
  it("Gets the button", () => {
    cy.visit("https://example.cypress.io/commands/querying");
    cy.get("#query-btn").should("contain", "Button");
    cy.get(".query-btn").should("contain", "Button");
    // Use CSS selectors just like jQuery
    cy.get("#querying .well>button:first").should("contain", "Button");
  });
});

// To find elements by data attribute, query using the attribute selector.
describe("Querying", () => {
  it("Query using the attribute selector", () => {
    cy.visit("https://example.cypress.io/commands/querying");
    cy.get('[data-test-id="test-example"]').should("have.class", "example");
  });
});

// cy.get() yields a jQuery object, you can get its attribute by invoking the .attr() method.
describe("Querying", () => {
  it("Invokes the .attr() method", () => {
    cy.visit("https://example.cypress.io/commands/querying");
    cy.get('[data-test-id="test-example"]')
      .invoke("attr", "data-test-id")
      .should("equal", "test-example");
    // or you can get an element's CSS property
    cy.get('[data-test-id="test-example"]')
      .invoke("css", "position")
      .should("equal", "static");
  });
});
