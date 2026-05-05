const BasePage = require('./BasePage');

class CartPage extends BasePage {
  async limparCarrinho() {
    await this.page.goto('https://automationexercise.com/view_cart');
    const deleteButtons = this.page.locator('.cart_delete a');
    const count = await deleteButtons.count();
    for (let i = 0; i < count; i++) {
      await deleteButtons.first().click();
      await this.page.waitForTimeout(500);
    }
  }

  async clicarVerCarrinhoModal() {
    await this.page.locator('#cartModal').getByText('View Cart').click();
  }

  async clicarCheckout() {
    await this.page.locator('.btn.btn-default.check_out').click();
  }

  async clicarContinuarComprando() {
    await this.page.locator('#cartModal').getByText('Continue Shopping').click();
    await this.page.goto('https://automationexercise.com/products');
  }

  async validarProdutoNoCarrinho(productId, productName, totalPrice) {
    const { expect } = require('@playwright/test');
    const productRow = this.page.locator(`tr#product-${productId}`);
    await expect(productRow).toContainText(productName);
    await expect(productRow.locator('.cart_total')).toHaveText(totalPrice);
  }
}

module.exports = CartPage;