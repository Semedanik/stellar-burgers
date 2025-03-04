import reducer, {
  initialState,
  getRegisterUser,
  getLoginUser,
  getUser,
  updateUser,
  getLogoutUser,
  getOrders
} from './user';
import { TOrder, TUser } from '@utils-types';
import { describe, test, expect } from '@jest/globals';
import { TRegisterData, TLoginData, TUserResponse } from '@api';

const mockUserData: TUser = {
  email: 'testuser@example.com',
  name: 'Test User'
};

const mockOrdersData: TOrder[] = [
  {
    _id: '12345',
    status: 'completed',
    name: 'Sample Order',
    createdAt: '2025-02-2T00:00:00Z',
    updatedAt: '2025-02-2T00:00:00Z',
    number: 1,
    ingredients: ['ingredient1', 'ingredient2']
  }
];

const mockRegisterData: TRegisterData = {
  email: 'testuser@example.com',
  password: 'securepassword',
  name: 'Test User'
};

const mockLoginData: TLoginData = {
  email: 'testuser@example.com',
  password: 'securepassword'
};

const mockRegisterResponse = {
  success: true,
  user: mockUserData,
  accessToken: 'token123',
  refreshToken: 'token456'
};

const mockLoginResponse = {
  success: true,
  user: mockUserData,
  accessToken: 'token123',
  refreshToken: 'token456'
};

const mockUserResponse = {
  success: true,
  user: mockUserData
};

const mockOrdersResponse = mockOrdersData;

describe('Тестированиеы userSlice', () => {
  test('Тестирование состояния при регистрации пользователя', () => {
    let state = reducer(
      initialState,
      getRegisterUser.pending('requestId', mockRegisterData)
    );
    expect(state.request).toBe(true);
    expect(state.error).toBe(null);
    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(true);

    state = reducer(
      state,
      getRegisterUser.fulfilled(
        mockRegisterResponse,
        'requestId',
        mockRegisterData
      )
    );
    expect(state.request).toBe(false);
    expect(state.error).toBe(null);
    expect(state.response).toEqual(mockUserData);
    expect(state.user).toEqual(mockUserData);
    expect(state.isAuthChecked).toBe(false);
    expect(state.isAuthenticated).toBe(true);

    state = reducer(
      state,
      getRegisterUser.rejected(
        new Error('error'),
        'requestId',
        mockRegisterData
      )
    );
    expect(state.request).toBe(false);
    expect(state.error).toBe('error');
    expect(state.isAuthChecked).toBe(false);
  });

  test('Тестирование состояния при логине пользователя', () => {
    let state = reducer(
      initialState,
      getLoginUser.pending('requestId', mockLoginData)
    );
    expect(state.loginUserRequest).toBe(true);
    expect(state.error).toBe(null);
    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(true);

    state = reducer(
      state,
      getLoginUser.fulfilled(mockLoginResponse, 'requestId', mockLoginData)
    );
    expect(state.loginUserRequest).toBe(false);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(mockUserData);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(true);

    state = reducer(
      state,
      getLoginUser.rejected(new Error('error'), 'requestId', mockLoginData)
    );
    expect(state.loginUserRequest).toBe(false);
    expect(state.error).toBe('error');
    expect(state.isAuthChecked).toBe(false);
  });

  test('Тестирование состояния при получении данных пользователя', () => {
    let state = reducer(initialState, getUser.pending('requestId'));
    expect(state.isAuthChecked).toBe(false);
    expect(state.isAuthenticated).toBe(false);

    state = reducer(state, getUser.fulfilled(mockUserResponse, 'requestId'));
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(mockUserData);
    expect(state.isAuthenticated).toBe(true);

    state = reducer(state, getUser.rejected(new Error('error'), 'requestId'));
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(false);
  });

  test('Тестирование состояния при обновлении данных', () => {
    const updatedUser = { name: 'Updated User', email: 'updated@example.com' };
    const mockUpdateResponse: TUserResponse = {
      success: true,
      user: updatedUser
    };

    let state = reducer(
      initialState,
      updateUser.pending('requestId', { name: 'Updated User' })
    );
    expect(state.request).toBe(true);
    expect(state.error).toBe(null);

    state = reducer(
      state,
      updateUser.fulfilled(mockUpdateResponse, 'requestId', {
        name: 'Updated User'
      })
    );
    expect(state.request).toBe(false);
    expect(state.error).toBe(null);
    expect(state.response).toEqual(updatedUser);

    state = reducer(
      state,
      updateUser.rejected(new Error('error'), 'requestId', {})
    );
    expect(state.request).toBe(false);
    expect(state.error).toBe('error');
  });

  test('Тестирование состояния при выходе', () => {
    let state = reducer(initialState, getLogoutUser.pending('requestId'));
    expect(state.request).toBe(true);
    expect(state.error).toBe(null);
    expect(state.isAuthenticated).toBe(false);

    state = reducer(state, getLogoutUser.fulfilled(undefined, 'requestId'));
    expect(state.request).toBe(false);
    expect(state.error).toBe(null);
    expect(state.user).toBe(null);
    expect(state.isAuthenticated).toBe(false);

    state = reducer(
      state,
      getLogoutUser.rejected(new Error('error'), 'requestId')
    );
    expect(state.request).toBe(false);
    expect(state.error).toBe('error');
    expect(state.isAuthenticated).toBe(true);
  });

  test('Тестирование состояния при получении заказов', () => {
    let state = reducer(initialState, getOrders.pending('requestId'));
    expect(state.request).toBe(true);
    expect(state.error).toBe(null);

    state = reducer(
      state,
      getOrders.fulfilled(mockOrdersResponse, 'requestId')
    );
    expect(state.request).toBe(false);
    expect(state.error).toBe(null);
    expect(state.userOrders).toEqual(mockOrdersData);

    state = reducer(state, getOrders.rejected(new Error('error'), 'requestId'));
    expect(state.request).toBe(false);
    expect(state.error).toBe('error');
  });
});
