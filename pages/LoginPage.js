const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  async preencherEmail(email) {
    await this.page.locator('[data-qa="login-email"]').fill(email);
  }

  async preencherSenha(senha) {
    await this.page.locator('[data-qa="login-password"]').fill(senha);
  }

  async clicarBotaoLogin() {
    await this.page.locator('[data-qa="login-button"]').click();
  }
}

module.exports = LoginPage;