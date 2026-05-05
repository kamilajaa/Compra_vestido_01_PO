const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  async validarResumoPedido(productId, productName, totalPrice) {
    const { expect } = require('@playwright/test');
    const productRow = this.page.locator(`tr#product-${productId}`);
    await expect(productRow).toContainText(productName);
    await expect(productRow.locator('.cart_total')).toHaveText(totalPrice);
  }

  async clicarPlaceOrder() {
    await this.page.locator('.btn.btn-default.check_out').click();
  }
}

module.exports = CheckoutPage;