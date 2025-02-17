import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getOrders, getUserData } from '../../services/slices/user';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/feed';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const { userOrders, request } = useSelector(getUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getFeeds());
  }, []);

  if (request === true) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={userOrders} />;
};
