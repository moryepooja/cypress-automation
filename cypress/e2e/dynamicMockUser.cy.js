describe('Dynamic Mock - Users', () => {
  it('Mocks API with dynamic data', () => {
    // Create dynamic data
    const users = Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      first_name: `User${i + 1}`,
    }))

    cy.intercept('GET', '**/api/users?page=2', {
      statusCode: 200,
      body: { data: users },
    }).as('getUsers')

    cy.visit('https://reqres.in')

    cy.window().then((win) => {
      return win.fetch('https://reqres.in/api/users?page=2')
    })

    cy.wait('@getUsers').then((interception) => {
      const responseUsers = interception.response.body.data

      // Inject into UI
      cy.document().then((doc) => {
        const container = doc.createElement('div')
        container.id = 'user-list'

        responseUsers.forEach((user) => {
          const el = doc.createElement('p')
          el.innerText = user.first_name
          container.appendChild(el)
        })

        doc.body.appendChild(container)
      })
    })

    // Validate dynamically generated data
    users.forEach((user) => {
      cy.contains(user.first_name).should('be.visible')
    })
  })
})
