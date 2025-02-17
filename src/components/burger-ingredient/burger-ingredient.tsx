import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';

import { BurgerIngredientUI } from '@ui';
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
