import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';

import { useDispatch } from '../../services/store';
import { TBurgerIngredientProps } from './type';
import { addIngredientConstructor } from '../../services/slices/constructor';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const handleAdd = () => {
      dispatch(addIngredientConstructor(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        locationState={{ background: location }}
        count={count}
        handleAdd={handleAdd}
      />
    );
  }
);
