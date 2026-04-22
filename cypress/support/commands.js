// 🔹 Mock API
Cypress.Commands.add('mockApi', (method, url, response, alias) => {
  cy.intercept(method, url, response).as(alias)
})

// 🔹 Trigger API from browser
Cypress.Commands.add('triggerApi', (url) => {
  cy.window().then((win) => win.fetch(url))
})

// 🔹 Single source of truth (wait + return response)
Cypress.Commands.add('getApiResponse', (alias) => {
  return cy.wait(`@${alias}`).then((interception) => {
    return interception.response
  })
})

// 🔹 Flexible validation (ADVANCED)
Cypress.Commands.add('validateResponse', (response, options = {}) => {
  const { status, length, field, value } = options

  if (status !== undefined) {
    expect(response.statusCode).to.eq(status)
  }

  if (length !== undefined) {
    expect(response.body.data.length).to.eq(length)
  }

  if (field && value !== undefined) {
    expect(response.body.data[0][field]).to.eq(value)
  }
})
