import productPage from '../../pages/productPage'

describe('API + UI Validation - Automation Exercise', () => {
  before(function () {
    cy.fixture('products').as('data')
  })

  it('Validates search API and UI for first product', function () {
    const searchItem = this.data.searches[0]

    productPage.visit()
    productPage.goToProducts()
    productPage.searchProduct(searchItem)

    // UI validation (this is the correct check for this site)
    cy.get('.product-image-wrapper', { timeout: 10000 }).should(
      'have.length.greaterThan',
      0
    )

    // Click first product
    productPage.clickFirstProduct()

    // Validate product page
    productPage.getProductTitle().should('be.visible')
    productPage.getProductPrice().then((el) => {
      const price = el.text()
      expect(price.length).to.be.greaterThan(0)
    })
  })
})
