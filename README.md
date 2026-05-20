# Teste de Compra - Automation Exercise
![Web E2E Tests](https://github.com/kamilajaa/Compra_vestido_01_PO/actions/workflows/web-tests.yml/badge.svg)

Projeto de automacao de testes usando Cucumber + Playwright + Page Objects.

## O que esse projeto faz

Testa o fluxo completo de compra no site [Automation Exercise](https://automationexercise.com/):
1. Faz login
2. Escolhe dois produtos
3. Coloca no carrinho
4. Finaliza a compra
5. Preenche os dados do cartao

## Como rodar os testes

### 1. Instalar as dependencias (só na primeira vez)

```bash
npm install
npx playwright install
```

### 2. Rodar os testes

```bash
npm test
```

## Como funciona

### Arquivo `compra.feature`

Esse arquivo é escrito em portugues e diz o que o teste deve fazer:

```gherkin
Given que estou na pagina inicial do site
When clico no link para realizar login
And preencho o email "joao.ssilva@teste.com"
```

### Arquivo `compra.steps.js`

Esse arquivo é o codigo JavaScript que executa cada frase do `.feature`:

```javascript
When('preencho o email {string}', async function (email) {
  await page.locator('[data-qa="login-email"]').fill(email);
});
```

O Cucumber le o `.feature`, encontra a frase, e executa o codigo correspondente.

### Pasta `pages/`

Aqui ficam os Page Objects. Cada arquivo representa uma pagina do site e guarda os seletores e acoes dela:

```
pages/
├── BasePage.js             <- Classe base com o page do Playwright
├── HomePage.js             <- Pagina inicial
├── LoginPage.js            <- Pagina de login
├── ProductsPage.js         <- Pagina de produtos
├── ProductDetailsPage.js   <- Detalhes do produto
├── CartPage.js             <- Carrinho de compras
├── CheckoutPage.js         <- Resumo do pedido
└── PaymentPage.js          <- Pagamento
```

---

## Produtos testados

O teste compra dois produtos no mesmo carrinho:

| Produto | Preco |
|---------|-------|
| Sleeveless Dress | Rs. 1000 |
| Men Tshirt | Rs. 400 |

Os dados estao na tabela `Examples` do arquivo `compra.feature`.

Se quiser testar outros produtos, é só trocar os numeros na tabela: nao precisa mexer no codigo.
Ademais vale lembrar que usar Page Objects faz uma integracao maior com o time, uma vez que qualquer pessoa ira conseguir ler e ver o que esta sendo feito no arquivo `.feature`, e se o site mudar algum botao ou campo, é só alterar em um lugar nas paginas que todos os testes se atualizam automaticamente.

---

## Dicas

- O navegador abre visivel para voce ver o robo trabalhando
- Os anuncios do Google sao bloqueados para carregar mais rapido
- Se der erro, olhe a mensagem no terminal que o Cucumber mostra qual passo falhou
