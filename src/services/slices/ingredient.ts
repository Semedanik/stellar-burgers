import { TIngredient } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

import { RootState } from '../store';

export type IngredientData = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: IngredientData = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredient/get',
  getIngredientsApi
);

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.ingredients = action.payload;
    });
  }
});

export const getIngredientData = (state: RootState): IngredientData =>
  state.ingredient;

export default ingredientSlice.reducer;
