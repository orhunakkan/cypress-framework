describe("Example API tests", () => {
  describe("GET SUCCESS!", () => {
    /**
     * GET https://run.mocky.io/v3/85c337aa-d055-4e0a-b4d2-0ece25869c3c
     * A valid GET call that returns { message: Success! }
     */
    it("should confirm status code and success message", () => {
      // Using env variables set in cypress.json
      cy.request(
        Cypress.env("mockyBaseURL") + Cypress.env("mockyGETSuccess")
      ).then((resp) => {
        // Verifying the status code to be 200
        expect(resp.status).to.eq(200);
        // Verifying that headers are returned
        expect(resp).to.have.property("headers");
        // Verifying that the body type is an object
        expect(resp.body).to.be.a("object");
        // Verifying the body's "Success" message
        expect(resp.body.message).to.eq("Success!");
      });
    });
  });

  describe("GET INVALID", () => {
    /**
     * GET https://run.mocky.io/v3/d4373ba8-b5f1-4e96-b48f-63289298f787
     * An "invalid" GET call that returns a 500 along with { error: Invalid Call }
     * NOTES: string interpolation is needed on the url property in order for the URL to build,
     * failOnStatusCode is needed in order to test a failing API call; essentially a keep-alive
     */
    it("should confirm status code and error message", () => {
      cy.request({
        url: `${Cypress.env("mockyBaseURL")}${Cypress.env("mockyGETInvalid")}`,
        failOnStatusCode: false,
      }).then((resp) => {
        // Verifying the status code to be 500
        expect(resp.status).to.eq(500);
        // Verifying that headers are returned
        expect(resp).to.have.property("headers");
        // Verifying that the body type is an object
        expect(resp.body).to.be.a("object");
        // Verifying the body's error message
        expect(resp.body.error).to.eq("Invalid Call");
      });
    });
  });

  describe("GET ARRAY", () => {
    before(() => {
      cy.fixture("exampleArray.json").as("expectedArray");
    });
    /**
     * GET https://run.mocky.io/v3/8a17c1ce-8398-44b3-bd24-35619c40b74d
     * An valid GET call that returns a 200 along with an array of results
     */
    it("should confirm status code and array of results", () => {
      cy.request(
        Cypress.env("mockyBaseURL") + Cypress.env("mockyGETArray")
      ).then((resp) => {
        // Verifying the status code to be 500
        expect(resp.status).to.eq(200);
        // Verifying that headers are returned
        expect(resp).to.have.property("headers");
        // Verifying that the body type is an array
        expect(resp.body).to.be.a("array");
        // Verifying the number of items in array
        expect(resp.body).to.have.length(7);
        // Doing a 1-1 comparison against fixture data
        cy.get("@expectedArray").then((expectedArray) => {
          expect(resp.body).to.deep.equal(expectedArray);
        });
      });
    });
  });
});
