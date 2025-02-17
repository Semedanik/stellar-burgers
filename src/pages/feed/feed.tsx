import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { getFeeds, selectFeedData } from '../../services/slices/feed';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  const { orders, loading } = useSelector(selectFeedData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
