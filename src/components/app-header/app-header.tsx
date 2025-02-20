import React, { FC } from 'react';
import { AppHeaderUI } from '@ui';

import { useSelector } from '../../services/store';
import { getUserData } from '../../services/slices/user';

export const AppHeader: FC = () => {
  const user = useSelector(getUserData).user;
  const userName = user?.name || '';
  return (
    <>
      <AppHeaderUI userName={userName} />
    </>
  );
};
