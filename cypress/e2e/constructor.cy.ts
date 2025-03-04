import { access } from 'fs';

describe('Проверка конструктора бургеров', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');
    cy.intercept('POST', 'api/orders', { fixture: 'new-order.json' }).as(
      'postOrder'
    );

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('mock-refreshToken')
    );
    cy.setCookie('accessToken', 'mock-accessToken');
    cy.visit('http://localhost:4000');
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Тестирование добавления булок', function () {
    cy.contains('Выберите булки').should('exist');
    cy.get('[data-cy=buns-section]').contains('Добавить').click();
    cy.contains('Выберите булки').should('not.exist');
    cy.get('[data-cy=top-bun]')
      .contains('Краторная булка N-200i (верх)')
      .should('exist');
    cy.get('[data-cy=down-bun]')
      .contains('Краторная булка N-200i (низ)')
      .should('exist');
  });

  it('Тестирование открытия модального окна', function () {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Краторная булка N-200i').should('exist');
  });

  it('Тестирование закрытия модального окна на крестик и по клику', function () {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('h3').contains('Детали ингредиента').parent().find('button').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Тестирование закрытия модального окна по клику и вне его', function () {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Тестирование сборки заказа и создания заказа', function () {
    cy.get('[data-cy=buns-section]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();

    cy.get('[data-cy=order-btn]').click();
    cy.wait('@postOrder');

    cy.contains('идентификатор заказа').should('exist');
    cy.get('[data-cy=order-number]').contains('240117').should('exist');

    cy.get('[data-cy=modal-close]').click();
    cy.contains('идентификатор заказа').should('not.exist');
    cy.get('[data-cy=top-bun]').should('not.exist');
    cy.get('[data-cy=down-bun]').should('not.exist');
    cy.get('[data-cy=constructor-ingredients]').contains('Выберите начинку');
    cy.get('[data-cy=constructor-ingredients]').within(() => {
      cy.get('li').should('have.length', 0);
    });
  });
});
