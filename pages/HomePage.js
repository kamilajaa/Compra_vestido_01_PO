const BasePage = require('./BasePage');

class HomePage extends BasePage {
  async irParaHome() {
    await this.page.goto('https://automationexercise.com/');
  }

  async clicarLogin() {
    await this.page.locator('#header a[href="/login"]').click();
  }

  async clicarMenuProdutos() {
    await this.page.locator('.navbar-nav a[href="/products"]').click();
  }
}

module.exports = HomePage;