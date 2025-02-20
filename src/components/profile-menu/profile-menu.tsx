import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { getLogoutUser } from '../../services/slices/user';
import { deleteCookie } from '../../utils/cookie';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(getLogoutUser());
    navigate('/Login');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
