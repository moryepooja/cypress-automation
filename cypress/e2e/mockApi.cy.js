describe('Mock API Testing - Clean Version', () => {
  it('Mocks successful API response', () => {
    // Mock API
    cy.intercept('GET', '**/api/users?page=2', {
      statusCode: 200,
      fixture: 'mockUsers.json',
    }).as('getUsers')

    // Open any page (needed for browser context)
    cy.visit('https://reqres.in')

    // Trigger API from browser (IMPORTANT)
    cy.window().then((win) => {
      return win.fetch('https://reqres.in/api/users?page=2')
    })

    // Validate mocked response
    cy.wait('@getUsers').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.response.body.data.length).to.eq(2)
      expect(interception.response.body.data[0].first_name).to.eq('John')
    })
  })

  it('Mocks API failure (500)', () => {
    cy.intercept('GET', '**/api/users?page=2', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('getUsersFail')

    cy.visit('https://reqres.in')

    cy.window().then((win) => {
      return win.fetch('https://reqres.in/api/users?page=2')
    })

    cy.wait('@getUsersFail').then((interception) => {
      expect(interception.response.statusCode).to.eq(500)
      expect(interception.response.body.error).to.eq('Internal Server Error')
    })
  })

  it('Mocks empty response', () => {
    cy.intercept('GET', '**/api/users?page=2', {
      statusCode: 200,
      body: { data: [] },
    }).as('getUsersEmpty')

    cy.visit(Cypress.config('baseUrl'))

    cy.window().then((win) => {
      return win.fetch('https://reqres.in/api/users?page=2')
    })

    cy.wait('@getUsersEmpty').then((interception) => {
      expect(interception.response.body.data).to.have.length(0)
    })
  })
})
