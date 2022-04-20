// Import Custom Command
// In commands.js import the file like so:

// import './oktaLogin'
// Setup Environment Variables
// Set up a cypress.env.json with variables defined in the commands.js:

// {
//   "username": "abc",
//   ...
// }
// For session_token_url replace the <...> with your okta domain

// https://<your-domain.okta.com>/api/v1/authn
// For auth_token_url replace the <...> with your okta domain

// https://<your-domain.okta.com>/oauth2/default/v1/authorize
// Get Additional Environment Variable from Browser
// If you sign into Okta in your browser and inspect the default/v1/authorize network call you'll be able to find these values:

// client_id
// code_challenge
// nonce
// state

Cypress.Commands.add("loginOkta", () => {
  const optionsSessionToken = {
    method: "POST",
    url: Cypress.env("session_token_url"),
    body: {
      username: Cypress.env("username"),
      password: Cypress.env("password"),
      options: {
        warnBeforePasswordExpired: "true",
      },
    },
  };

  cy.request(optionsSessionToken).then((response) => {
    const sessionToken = response.body.sessionToken;
    const qs = {
      client_id: Cypress.env("client_id"),
      code_challenge: Cypress.env("code_challenge"),
      state: Cypress.env("state"),
      nonce: Cypress.env("nonce"),
      redirect_uri: Cypress.env("redirect_uri"),
      code_challenge_method: "S256",
      response_mode: "fragment",
      response_type: "code",
      scope: ["openid", "profile", "email"],
      sessionToken: sessionToken,
    };

    cy.request({
      method: "GET",
      url: Cypress.env("auth_token_url"),
      form: true,
      followRedirect: false,
      qs: qs,
    }).then((responseWithToken) => {
      const redirectUrl = responseWithToken.redirectedToUrl;

      const accessToken = redirectUrl
        .substring(redirectUrl.indexOf("access_token"))
        .split("=")[1]
        .split("&")[0];

      cy.wrap(accessToken).as("accessToken");

      cy.visit(redirectUrl).then(() => {
        cy.visit("/");
      });
    });
  });
});
