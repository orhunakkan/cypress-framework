// This is not tied to anything yet

var AddElement = function () {
    this.getHeadingText = function () {
      return cy.get("h3");
    };
  
    this.clickAddButton = function () {
      return cy.get('[onclick="addElement()"]').click();
    };
  
    this.clickDeleteButton = function () {
      return cy.get('[onclick="deleteElement()"]').click();
    };
  
    this.getElements = function () {
      return cy.get("#elements .added-manually");
    };
  
    this.deleteAll = function () {
      this.getElements().should("have.length", 2);
      this.getElements().each((element) => {
        return element.click();
      });
    };
  };
  module.exports = new AddElement();