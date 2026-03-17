import { Flex, Layout, notification } from 'antd';
import Routers from './components/Routers';
import AppSider from './components/AppSider';
import { Content } from 'antd/es/layout/layout';
import { useAppDispatch, useAppSelector } from './store';
import { useEffect, useState } from 'react';
import loginImage from './assets/image/auth_illustration.png';
import axios from 'axios';
import { Token } from './types/authTypes.ts';
import { API_URL } from './api/http.ts';
import { tokenManager } from './helpers/TokenManager.ts';
import { setAuth, setProfile } from './store/slices/authSlice.ts';
import { getProfile } from './services/usersServices.ts';

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [isLoading, setIsLoading] = useState(!!localStorage.getItem('token'));

  const refresh = async (token: string) => {
    const response = await axios.post<Token>(`${API_URL}/auth/refresh`, {
      refreshToken: token,
    });

    tokenManager.setToken(response.data.accessToken);

    dispatch(setAuth(true));

    localStorage.setItem('token', response.data.refreshToken);
  };

  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      dispatch(setProfile(response.data));
    } catch (e) {
      console.error(e);
      notification.error({
        title: 'Ошибка!',
        description: 'Ошибка при получении профиля',
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    (async () => {
      if (token) {
        setIsLoading(true);
        try {
          await refresh(token);
          await fetchProfile();
        } catch (e) {
          console.error(e);
          localStorage.clear();
          tokenManager.clearToken();
        }
      } else {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Layout>
      <AppSider theme={'light'} />
      <Flex align={'center'} justify={'center'}>
        {!isAuth && <img width={1000} height={1000} src={loginImage} alt="" />}
        <Content>
          <Routers />
        </Content>
      </Flex>
    </Layout>
  );
}

export default App;
