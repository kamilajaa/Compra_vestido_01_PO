const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const ProductDetailsPage = require('../pages/ProductDetailsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const PaymentPage = require('../pages/PaymentPage');

setDefaultTimeout(60000);

let browser;
let page;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  await context.clearCookies();

  page = await context.newPage();

  await page.route("**/*", route => {
    const url = route.request().url();
    const blocked = [
      'googleads', 'doubleclick', 'googlesyndication',
      'google-analytics', 'googletagmanager', 'google_vignette', 'vignette'
    ];
    if (blocked.some(host => url.includes(host))) route.abort();
    else route.continue();
  });

  this.homePage = new HomePage(page);
  this.loginPage = new LoginPage(page);
  this.productsPage = new ProductsPage(page);
  this.productDetailsPage = new ProductDetailsPage(page);
  this.cartPage = new CartPage(page);
  this.checkoutPage = new CheckoutPage(page);
  this.paymentPage = new PaymentPage(page);
});

After(async function () {
  if (browser) {
    await browser.close();
  }
});


Given('que estou na pagina inicial do site', async function () {
  await this.homePage.irParaHome();
  await expect(page).toHaveURL('https://automationexercise.com/');
});

When('clico no link para realizar login', async function () {
  await this.homePage.clicarLogin();
  await expect(page).toHaveURL('https://automationexercise.com/login');
});

When('preencho o email {string}', async function (email) {
  await this.loginPage.preencherEmail(email);
});

When('preencho a senha {string}', async function (senha) {
  await this.loginPage.preencherSenha(senha);
});

When('clico no botao de login', async function () {
  await this.loginPage.clicarBotaoLogin();
  await expect(page).toHaveURL('https://automationexercise.com/');
});

Then('devo ser redirecionado para a pagina inicial logado', async function () {
  await expect(page).toHaveURL('https://automationexercise.com/');
  await expect(page.locator('#header')).toBeVisible();
  await expect(page.locator('.nav.navbar-nav')).toBeVisible();
});

Then('limpo o carrinho de compras caso haja itens', async function () {
  await this.cartPage.limparCarrinho();
});

Given('que estou logado no sistema', async function () {
  await expect(page.locator('#header')).toBeVisible();
  await expect(page.locator('.nav.navbar-nav')).toBeVisible();
});

When('acesso a pagina de produtos', async function () {
  await this.homePage.clicarMenuProdutos();
  await expect(page).toHaveURL('https://automationexercise.com/products');
});

When('seleciono o produto de ID {string}', async function (productId) {
  await this.productsPage.clicarProdutoPorId(productId);
  await expect(page).toHaveURL(`https://automationexercise.com/product_details/${productId}`);
});

Then('devo ver os detalhes do produto {string} com preco {string}', async function (productName, price) {
  await this.productDetailsPage.validarNomeProduto(productName);
  await this.productDetailsPage.validarPrecoProduto(price);
});

When('adiciono o produto ao carrinho', async function () {
  await this.productDetailsPage.adicionarAoCarrinho();
});

When('continuo comprando', async function () {
  await this.cartPage.clicarContinuarComprando();
});

When('acesso o carrinho de compras', async function () {
  await this.cartPage.clicarVerCarrinhoModal();
  await expect(page).toHaveURL('https://automationexercise.com/view_cart');
});

Then('devo ver o produto de ID {string} com nome {string} e preco total {string}', async function (productId, productName, totalPrice) {
  await this.cartPage.validarProdutoNoCarrinho(productId, productName, totalPrice);
});

When('clico em proceed to checkout', async function () {
  await this.cartPage.clicarCheckout();
});

Then('devo ver o resumo do pedido com o produto de ID {string} com nome {string} e preco total {string}', async function (productId, productName, totalPrice) {
  await this.checkoutPage.validarResumoPedido(productId, productName, totalPrice);
});

When('clico em place order', async function () {
  await this.checkoutPage.clicarPlaceOrder();
  await expect(page).toHaveURL('https://automationexercise.com/payment');
});

Then('devo ser redirecionado para a pagina de pagamento', async function () {
  await expect(page).toHaveURL('https://automationexercise.com/payment');
});

When('preencho os dados do cartao com nome {string}, numero {string}, CVC {string}, mes {string} e ano {string}', async function (cardName, cardNumber, cvc, mes, ano) {
  await this.paymentPage.preencherDadosCartao(cardName, cardNumber, cvc, mes, ano);
});

When('confirmo o pagamento', async function () {
  await this.paymentPage.confirmarPagamento();
});

Then('devo ser redirecionado para a pagina de confirmacao de pedido', async function () {
  await expect(page).toHaveURL(/.*payment_done.*/);
});

Then('devo ver a mensagem {string}', async function (message) {
  await this.paymentPage.validarMensagem(message);
});