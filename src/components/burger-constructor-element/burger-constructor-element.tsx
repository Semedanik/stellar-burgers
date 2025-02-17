import React, { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  shiftIngridientDown,
  shiftIngridientUp,
  removeIngredientConstructor
} from '../../services/slices/constructor';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    // Перемещение ингредиента вниз
    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        dispatch(shiftIngridientDown(ingredient.id));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(shiftIngridientUp(ingredient.id));
      }
    };

    const handleClose = () => {
      dispatch(removeIngredientConstructor(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        totalItems={totalItems}
        handleClose={handleClose}
      />
    );
  }
);
