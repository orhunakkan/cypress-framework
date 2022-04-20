Cypress.Commands.add("login", () => {
    cy.request({
      method: "POST",
      url: `https://login.microsoftonline.com/${Cypress.config("tenantId")}/oauth2/token`,
      form: true,
      body: {
        grant_type: "client_credentials",
        client_id: Cypress.config("clientId"),
        client_secret: Cypress.config("clientSecret"),
      },
    }).then(response => {
      const ADALToken = response.body.access_token;
      const expiresOn = response.body.expires_on;
  
      localStorage.setItem("adal.token.keys", `${Cypress.config("clientId")}|`);
      localStorage.setItem(`adal.access.token.key${Cypress.config("clientId")}`, ADALToken);
      localStorage.setItem(`adal.expiration.key${Cypress.config("clientId")}`, expiresOn);
      localStorage.setItem("adal.idtoken", ADALToken);
    });
  });

  // This may need more work
  // reference -> https://mechanicalrock.github.io/2020/05/05/azure-ad-authentication-cypress.html