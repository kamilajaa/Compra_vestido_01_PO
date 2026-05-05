const BasePage = require('./BasePage');

class PaymentPage extends BasePage {
  async preencherDadosCartao(cardName, cardNumber, cvc, mes, ano) {
    await this.page.locator('[data-qa="name-on-card"]').fill(cardName);
    await this.page.locator('[data-qa="card-number"]').fill(cardNumber);
    await this.page.locator('[data-qa="cvc"]').fill(cvc);
    await this.page.locator('[data-qa="expiry-month"]').fill(mes);
    await this.page.locator('[data-qa="expiry-year"]').fill(ano);
  }

  async confirmarPagamento() {
    await this.page.locator('#submit').click();
  }

  async validarMensagem(message) {
    const { expect } = require('@playwright/test');
    await expect(this.page.locator('[data-qa="order-placed"]')).toHaveText(message);
  }
}

module.exports = PaymentPage;