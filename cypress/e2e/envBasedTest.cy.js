describe('Env Based Test', () => {
  it('Uses environment config', () => {
    cy.visit(Cypress.config('baseUrl'))

    const apiUrl = Cypress.config('apiUrl')

    cy.mockApi(
      'GET',
      '**/users?page=2',
      {
        statusCode: 200,
        fixture: 'mockUsers.json',
      },
      'getUsers'
    )

    cy.triggerApi(`${apiUrl}/users?page=2`)
    cy.wait('@getUsers', { timeout: 10000 })
    cy.getApiResponse('getUsers').then((response) => {
      cy.validateResponse(response, { status: 200, length: 2 })
    })
  })
})
