describe('Env Based Test', () => {
  it('Uses environment config', () => {
    cy.visit(Cypress.config('baseUrl'))

    // const apiUrl = Cypress.config('apiUrl')

    cy.mockApi(
      'GET',
      '**/api/users?page=2',
      {
        statusCode: 200,
        fixture: 'mockUsers.json',
      },
      'getUsers'
    )

    cy.visit('https://reqres.in')

    // Trigger AFTER visit
    cy.window().then((win) => {
      return win.fetch('https://reqres.in/api/users?page=2')
    })

    // ✅ Single wait (only once!)
    cy.getApiResponse('getUsers').then((response) => {
      cy.validateResponse(response, {
        status: 200,
        length: 2,
      })
    })
  })
})
