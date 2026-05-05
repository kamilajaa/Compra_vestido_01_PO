const BasePage = require('./BasePage');

class ProductDetailsPage extends BasePage {
  async validarNomeProduto(productName) {
    const { expect } = require('@playwright/test');
    await expect(this.page.locator('.product-information h2')).toHaveText(productName);
  }

  async validarPrecoProduto(price) {
    const { expect } = require('@playwright/test');
    await expect(this.page.locator('.product-information').getByText(price)).toBeVisible();
  }

  async adicionarAoCarrinho() {
    await this.page.locator('.btn.btn-default.cart').click();
  }
}

module.exports = ProductDetailsPage;