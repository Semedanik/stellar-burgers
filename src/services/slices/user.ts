import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';

import { deleteCookie, setCookie } from '../../utils/cookie';
import { RootState } from '../store';

export type UserData = {
  request: boolean;
  error: string | null;
  response: TUser | null;
  registerData: TRegisterData | null;
  user: TUser | null;
  userOrders: TOrder[];
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserRequest: boolean;
};

export const initialState: UserData = {
  request: false,
  error: null,
  response: null,
  registerData: null,
  user: null,
  userOrders: [],
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserRequest: false
};

export const getUser = createAsyncThunk('users/getUser', getUserApi);
export const getOrders = createAsyncThunk('users/getOrders', getOrdersApi);
export const updateUser = createAsyncThunk('users/updateUser', updateUserApi);

export const getRegisterUser = createAsyncThunk(
  'users/register',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const getLoginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    if (!data.success) {
      return data;
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const getLogoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  localStorage.clear();
  deleteCookie('accessToken');
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    userLogout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getRegisterUser.pending, (state) => {
      state.request = true;
      state.error = null;
      state.isAuthChecked = true;
      state.isAuthenticated = false;
    });
    builder.addCase(getRegisterUser.rejected, (state, action) => {
      state.request = false;
      state.error = action.error.message as string;
      state.isAuthChecked = false;
    });
    builder.addCase(getRegisterUser.fulfilled, (state, action) => {
      state.request = false;
      state.error = null;
      state.response = action.payload.user;
      state.user = action.payload.user;
      state.isAuthChecked = false;
      state.isAuthenticated = true;
    });

    builder.addCase(getLoginUser.pending, (state) => {
      state.loginUserRequest = true;
      state.error = null;
      state.isAuthChecked = true;
      state.isAuthenticated = false;
    });
    builder.addCase(getLoginUser.rejected, (state, action) => {
      state.loginUserRequest = false;
      state.error = action.error.message as string;
      state.isAuthChecked = false;
    });
    builder.addCase(getLoginUser.fulfilled, (state, action) => {
      state.loginUserRequest = false;
      state.error = null;
      state.user = action.payload.user;
      state.isAuthChecked = true;
      state.isAuthenticated = true;
    });
    builder.addCase(getUser.pending, (state) => {
      state.isAuthChecked = false;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.isAuthChecked = true;
      state.isAuthenticated = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isAuthChecked = true;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.request = true;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.request = false;
      state.error = action.error.message as string;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.request = false;
      state.error = null;
      state.response = action.payload.user;
    });
    builder.addCase(getLogoutUser.pending, (state) => {
      state.request = true;
      state.error = null;
      state.isAuthChecked = true;
      state.isAuthenticated = false;
    });
    builder.addCase(getLogoutUser.rejected, (state, action) => {
      state.request = false;
      state.error = action.error.message as string;
      state.isAuthChecked = false;
      state.isAuthenticated = true;
    });
    builder.addCase(getLogoutUser.fulfilled, (state, action) => {
      state.request = false;
      state.error = null;
      state.user = null;
      state.isAuthChecked = true;
      state.isAuthenticated = false;
    });
    builder.addCase(getOrders.pending, (state) => {
      state.request = true;
      state.error = null;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.request = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.request = false;
      state.error = null;
      state.userOrders = action.payload;
    });
  }
});

export const { userLogout, resetError } = userSlice.actions;

export const getUserData = (state: RootState): UserData => state.user;

export default userSlice.reducer;
