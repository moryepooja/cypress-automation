class UserPage {
  visit() {
    cy.visit('https://reqres.in')
  }

  getUsers() {
    return cy.request('/api/users?page=2')
  }
}

export default new UserPage()
