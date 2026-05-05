Feature: Fluxo de compra no site Automation Exercise
  Como um usuario cadastrado
  Quero realizar a compra de produtos
  Para que eu possa adquirir itens do catalogo

  Background: Login do usuario
    Given que estou na pagina inicial do site
    When clico no link para realizar login
    And preencho o email "joao.ssilva@teste.com"
    And preencho a senha "Teste@123"
    And clico no botao de login
    Then devo ser redirecionado para a pagina inicial logado
    And limpo o carrinho de compras caso haja itens

  Scenario Outline: Realizar compra de dois produtos com sucesso
    Given que estou logado no sistema
    When acesso a pagina de produtos
    And seleciono o produto de ID "<product_id1>"
    Then devo ver os detalhes do produto "<product_name1>" com preco "<product_price1>"
    When adiciono o produto ao carrinho
    And continuo comprando
    And acesso a pagina de produtos
    And seleciono o produto de ID "<product_id2>"
    Then devo ver os detalhes do produto "<product_name2>" com preco "<product_price2>"
    When adiciono o produto ao carrinho
    And acesso o carrinho de compras
    Then devo ver o produto de ID "<product_id1>" com nome "<product_name1>" e preco total "<product_price1>"
    And devo ver o produto de ID "<product_id2>" com nome "<product_name2>" e preco total "<product_price2>"
    When clico em proceed to checkout
    Then devo ver o resumo do pedido com o produto de ID "<product_id1>" com nome "<product_name1>" e preco total "<product_price1>"
    And devo ver o resumo do pedido com o produto de ID "<product_id2>" com nome "<product_name2>" e preco total "<product_price2>"
    When clico em place order
    Then devo ser redirecionado para a pagina de pagamento
    When preencho os dados do cartao com nome "<card_name>", numero "<card_number>", CVC "<cvc>", mes "<expiry_month>" e ano "<expiry_year>"
    And confirmo o pagamento
    Then devo ser redirecionado para a pagina de confirmacao de pedido
    And devo ver a mensagem "Order Placed!"

    Examples:
      | product_id1 | product_name1    | product_price1 | product_id2 | product_name2 | product_price2 | card_name  | card_number      | cvc | expiry_month | expiry_year |
      | 3           | Sleeveless Dress | Rs. 1000       | 2           | Men Tshirt    | Rs. 400        | Joao Silva | 4242424242424242 | 123 | 12           | 2028        |