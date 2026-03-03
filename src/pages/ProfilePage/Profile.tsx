import { FC, useEffect, useState } from 'react';
import { Button, notification, Table } from 'antd';
import { getProfile } from '../../services/userServices.ts';
import { ProfileRequest } from '../../types/authTypes.ts';
import { logout } from '../../services/authServices.ts';
import { useNavigate } from 'react-router';
import { tokenManager } from '../../helpers/tokenManager.ts';
import { useAppDispatch } from '../../store';
import { setAuth } from '../../store/slices/authSlice.ts';

const Profile: FC = () => {
  const [profile, setProfile] = useState<ProfileRequest>({
    username: '',
    email: '',
    phoneNumber: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getProfile();

      setProfile({
        username: response.data.username,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
      });
    })();
  }, []);

  const dataSource = [
    {
      key: '1',
      username: profile.username,
      email: profile.email,
      phone: profile.phoneNumber || 'Не указан',
    },
  ];

  const columns = [
    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Почтовый адрес',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setAuth(false));
      localStorage.clear();
      tokenManager.clearToken();
      navigate('/login');
    } catch (e) {
      console.error(e);
      notification.error({
        title: 'Ошибка!',
        description: 'Ошибка при обнулении токенов',
      });
    }
  };

  return (
    <>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <Button
        style={{ marginLeft: '90%' }}
        size={'large'}
        onClick={handleLogout}
      >
        Выйти
      </Button>
    </>
  );
};

export default Profile;
