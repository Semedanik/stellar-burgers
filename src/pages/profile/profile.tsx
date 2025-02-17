import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from '../../services/store';
import { getUser, getUserData, updateUser } from '../../services/slices/user';
import { useDispatch } from '../../services/store';
import { Preloader } from '@ui';

export const Profile: FC = () => {
  const data = useSelector(getUserData).user;
  const loading = useSelector(getUserData).request;
  const [isFormChanged, setIsFormChanged] = useState(false);
  const dispatch = useDispatch();

  const user = {
    name: data?.name || '',
    email: data?.email || ''
  };

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    if (data) {
      setFormValue({
        name: data.name || '',
        email: data.email || '',
        password: ''
      });
    }
  }, [data]);

  useEffect(() => {
    setIsFormChanged(
      formValue.name !== user.name ||
        formValue.email !== user.email ||
        !!formValue.password
    );
  }, [formValue, user]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue))
      .unwrap()
      .then(() => {
        setIsFormChanged(false);
        setFormValue({ ...formValue, password: '' });
        dispatch(getUser());
      });
  };

  if (loading) {
    return <Preloader />;
  }

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
    setIsFormChanged(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
