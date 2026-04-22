import { productLocators } from '../locators/productLocators'

class ProductPage {
  visit() {
    cy.visit('https://automationexercise.com')
  }

  goToProducts() {
    cy.get(productLocators.productsLink).click()
  }

  searchProduct(product) {
    cy.get(productLocators.searchBox).type(product)
    cy.get(productLocators.searchButton).click()
  }

  clickFirstProduct() {
    cy.get(productLocators.productCard)
      .first()
      .contains(productLocators.viewProduct)
      .click()
  }

  getProductTitle() {
    return cy.get(productLocators.productTitle)
  }

  getProductPrice() {
    return cy.get(productLocators.productPrice)
  }
}

export default new ProductPage()
