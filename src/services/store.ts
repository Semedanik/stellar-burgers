import { combineReducers, configureStore } from '@reduxjs/toolkit';

import ingredientReducer from './slices/ingredient';
import constructorReducer from './slices/constructor';
import orderReducer from './slices/order';
import feedReducer from './slices/feed';
import userReducer from './slices/user';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  constructorItems: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
