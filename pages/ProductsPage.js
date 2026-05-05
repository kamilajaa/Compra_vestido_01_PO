const BasePage = require('./BasePage');

class ProductsPage extends BasePage {
  async clicarProdutoPorId(productId) {
    await this.page.locator(`a[href="/product_details/${productId}"]`).first().click();
  }
}

module.exports = ProductsPage;