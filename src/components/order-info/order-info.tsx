import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { getIngredientData } from '../../services/slices/ingredient';
import { getOrderByNumber, getOrderData } from '../../services/slices/order';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';

export const OrderInfo: FC = () => {
  const { getOrderByNumberResponse, request } = useSelector(getOrderData);
  const dispatch = useDispatch();
  const number = Number(useParams().number);

  const { ingredients } = useSelector(getIngredientData);
  useEffect(() => {
    dispatch(getOrderByNumber(number));
  }, []);
  const orderInfo = useMemo(() => {
    if (!getOrderByNumberResponse || !ingredients.length) return null;

    const date = new Date(getOrderByNumberResponse.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = getOrderByNumberResponse.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...getOrderByNumberResponse,
      ingredientsInfo,
      date,
      total
    };
  }, [getOrderByNumberResponse, ingredients]);

  if (!orderInfo || request) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
