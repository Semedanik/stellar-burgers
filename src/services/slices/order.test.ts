import reducer, { initialState, getOrderByNumber } from './order';
import { TOrder } from '@utils-types';
import { describe, test, expect } from '@jest/globals';
import { TOrderResponse } from '@api';

const mockOrder: TOrder = {
  _id: '67890',
  status: 'done',
  name: 'Order',
  createdAt: '2025-02-01T12:30:00Z',
  updatedAt: '2025-02-01T12:30:00Z',
  number: 2,
  ingredients: ['item1', 'item2']
};

const mockOrderResponse: TOrderResponse = {
  success: true,
  orders: [mockOrder]
};

describe('Тестирование асинхронных экшенов ', () => {
  test('Тестирование состояния загрузки заказа по номеру', async () => {
    let state = reducer(initialState, getOrderByNumber.pending('pending', 1));
    expect(state.request).toBe(true);
    expect(state.getOrderByNumberResponse).toBe(null);
    expect(state.error).toBe(null);

    state = reducer(
      state,
      getOrderByNumber.fulfilled(mockOrderResponse, 'fulfilled', 1)
    );
    expect(state.request).toBe(false);
    expect(state.getOrderByNumberResponse).toEqual(mockOrder);
    expect(state.error).toBe(null);
  });

  test('Тестирование сообщения ошибки при rejected', async () => {
    const state = reducer(
      initialState,
      getOrderByNumber.rejected(new Error('error'), 'rejected', 1)
    );
    expect(state.request).toBe(false);
    expect(state.getOrderByNumberResponse).toBe(null);
    expect(state.error).toBe('error');
  });
});
