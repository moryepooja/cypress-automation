describe('Custom Commands - Advanced API Mock', () => {
  it('Validates API using reusable commands', () => {
    const url = 'https://reqres.in/api/users?page=2'

    // 🔹 Mock API
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

    // 🔹 Trigger API
    cy.triggerApi(url)

    // 🔹 Single wait + advanced validation
    cy.getApiResponse('getUsers').then((response) => {
      cy.validateResponse(response, {
        status: 200,
        length: 2,
        field: 'first_name',
        value: 'John',
      })
    })
  })
})
