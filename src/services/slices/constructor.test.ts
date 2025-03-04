import constructorSlice, {
  addIngredientConstructor,
  shiftIngridientUp,
  shiftIngridientDown,
  removeIngredientConstructor,
  initialState
} from './constructor';
import { test, expect } from '@jest/globals';

const mockBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

const mockIngredient = {
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
  __v: 0
};

const fullInitialState = {
  ...initialState,
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: null
};

test('Добавление первой булки', () => {
  const newState = constructorSlice(
    fullInitialState,
    addIngredientConstructor(mockBun)
  );
  expect(newState.constructorItems.bun).toEqual({
    ...mockBun,
    id: expect.any(String)
  });
});

test('Замена существующей булки', () => {
  const newBun = {
    ...mockBun,
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    price: 988
  };

  const stateWithBun = constructorSlice(
    fullInitialState,
    addIngredientConstructor(mockBun)
  );
  const newState = constructorSlice(
    stateWithBun,
    addIngredientConstructor(newBun)
  );
  expect(newState.constructorItems.bun).toEqual({
    ...newBun,
    id: expect.any(String)
  });
});

test('Добавление ингредиента', () => {
  const newState = constructorSlice(
    fullInitialState,
    addIngredientConstructor(mockIngredient)
  );
  expect(newState.constructorItems.ingredients).toEqual([
    {
      ...mockIngredient,
      id: expect.any(String)
    }
  ]);
});

test('Удаление ингредиента', () => {
  const stateWithIngredient = constructorSlice(
    fullInitialState,
    addIngredientConstructor(mockIngredient)
  );
  const ingredientId = stateWithIngredient.constructorItems.ingredients[0].id;
  const newState = constructorSlice(
    stateWithIngredient,
    removeIngredientConstructor(ingredientId)
  );
  expect(newState.constructorItems.ingredients).toEqual([]);
});

test('Перемещение ингредиента вверх', () => {
  const testState = {
    ...fullInitialState,
    constructorItems: {
      bun: null,
      ingredients: [
        { ...mockIngredient, id: 'a', _id: '1' },
        { ...mockIngredient, id: 'b', _id: '2' }
      ]
    }
  };

  const newState = constructorSlice(testState, shiftIngridientUp('b'));
  expect(newState.constructorItems.ingredients.map((i) => i.id)).toEqual([
    'b',
    'a'
  ]);
});

test('Перемещение ингредиента вниз', () => {
  const testState = {
    ...fullInitialState,
    constructorItems: {
      bun: null,
      ingredients: [
        { ...mockIngredient, id: 'a', _id: '1' },
        { ...mockIngredient, id: 'b', _id: '2' }
      ]
    }
  };

  const newState = constructorSlice(testState, shiftIngridientDown('a'));
  expect(newState.constructorItems.ingredients.map((i) => i.id)).toEqual([
    'b',
    'a'
  ]);
});
