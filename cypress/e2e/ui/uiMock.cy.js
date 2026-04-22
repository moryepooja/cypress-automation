describe('UI + Mock API Flow', () => {
  it('Validates UI using mocked API data', () => {
    // Step 1: Mock API
    cy.intercept('GET', '**/api/users?page=2', {
      statusCode: 200,
      fixture: 'mockUsers.json',
    }).as('getUsers')

    // Step 2: Visit page
    cy.visit(Cypress.config('baseUrl'))

    // Step 3: Trigger API call from browser
    cy.window().then((win) => {
      return win.fetch('https://reqres.in/api/users?page=2')
    })

    // Step 4: Wait for mocked response
    cy.wait('@getUsers').then((interception) => {
      const users = interception.response.body.data

      // Step 5: Inject into UI (simulate frontend rendering)
      cy.document().then((doc) => {
        const container = doc.createElement('div')
        container.id = 'user-list'

        users.forEach((user) => {
          const el = doc.createElement('p')
          el.innerText = user.first_name
          container.appendChild(el)
        })

        doc.body.appendChild(container)
      })
    })

    // Step 6: Validate UI
    cy.get('#user-list').should('exist')
    cy.contains('John').should('be.visible')
    cy.contains('Jane').should('be.visible')
  })
})
