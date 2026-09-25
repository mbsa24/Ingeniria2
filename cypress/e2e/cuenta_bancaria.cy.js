describe('Pruebas de Interfaz - Swag Labs (saucedemo.com)', function () {

  beforeEach(function () {
    // Evita que errores internos de la página (scripts de terceros) tumben la prueba
    cy.on('uncaught:exception', () => false);

    // 1. Navegación inicial (usa el baseUrl de cypress.config.js)
    cy.visit('/');
    cy.get('[data-test="login-button"]').should('be.visible');
  });

  it('Login con credenciales inválidas muestra mensaje de error', function () {
    cy.get('[data-test="username"]').type('usuario_falso');
    cy.get('[data-test="password"]').type('clave_falsa');
    cy.get('[data-test="login-button"]').click();

    // El sistema rechaza el acceso y muestra el error
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match');
    cy.url().should('not.include', 'inventory.html');
  });

  it('Compra completa: login, carrito y checkout', function () {
    // Login con usuario válido
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Página de productos
    cy.url().should('include', 'inventory.html');
    cy.get('.title').should('have.text', 'Products');
    cy.get('.inventory_item').should('have.length', 6);

    // Agregar dos productos al carrito
    cy.contains('.inventory_item', 'Sauce Labs Backpack').find('button').click();
    cy.contains('.inventory_item', 'Sauce Labs Bike Light').find('button').click();
    cy.get('.shopping_cart_badge').should('have.text', '2');

    // Ir al carrito y validar los productos
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', 'cart.html');
    cy.get('.cart_item').should('have.length', 2);
    cy.contains('.cart_item', 'Sauce Labs Backpack').should('be.visible');

    // Checkout: diligenciar datos del comprador
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('Rodolfo');
    cy.get('[data-test="lastName"]').type('Hoyos');
    cy.get('[data-test="postalCode"]').type('050001');
    cy.get('[data-test="firstName"]').should('have.value', 'Rodolfo');
    cy.get('[data-test="continue"]').click();

    // Resumen de la orden
    cy.url().should('include', 'checkout-step-two.html');
    cy.get('.summary_total_label').should('be.visible').and('contain', 'Total');
    cy.get('[data-test="finish"]').click();

    // Aserción final: la orden se completó
    cy.url().should('include', 'checkout-complete.html');
    cy.get('.complete-header')
      .should('be.visible')
      .and('contain', 'Thank you for your order!');
  });

});