import reducer, { initialState, getIngredients } from './ingredient';
import { TIngredient } from '@utils-types';
import { describe, test } from '@jest/globals';

const mockIngredients: TIngredient[] = [
  {
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
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
  },
  {
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
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
  }
];
describe('Тестирование асинхронных экшенов', () => {
  const expectedResult = mockIngredients;

  test('Тестирование загрузки ингредиентов', async () => {
    const state = reducer(
      initialState,
      getIngredients.fulfilled(expectedResult, 'fulfilled')
    );
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(expectedResult);
  });

  test('Тестирование сообщения ошибки', async () => {
    const state = reducer(
      initialState,
      getIngredients.rejected(new Error('error'), 'rejected')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('error');
  });

  test('Тестирование состояния загрузи', async () => {
    const state = reducer(initialState, getIngredients.pending('pending'));
    expect(state.loading).toBe(true);
  });
});
