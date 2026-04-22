const testDataSets = [
  [{ id: 1, first_name: 'Siddhesh' }],
  [
    { id: 1, first_name: 'Pooja' },
    { id: 2, first_name: 'Siya' },
  ],
  [],
]

describe('Dynamic Mock - Multiple Scenarios', () => {
  testDataSets.forEach((data, index) => {
    it(`Scenario ${index + 1}`, () => {
      cy.intercept('GET', '**/api/users?page=2', {
        statusCode: 200,
        body: { data },
      }).as('getUsers')

      cy.visit('https://reqres.in')

      cy.window().then((win) => {
        return win.fetch('https://reqres.in/api/users?page=2')
      })

      cy.wait('@getUsers')

      cy.document().then((doc) => {
        const container = doc.createElement('div')
        container.id = 'user-list'

        data.forEach((user) => {
          const el = doc.createElement('p')
          el.innerText = user.first_name
          container.appendChild(el)
        })

        doc.body.appendChild(container)
      })

      if (data.length === 0) {
        cy.get('#user-list').should('exist')
        cy.get('#user-list').children().should('have.length', 0)
      } else {
        data.forEach((user) => {
          cy.contains(user.first_name).should('exist')
        })
      }
    })
  })
})
