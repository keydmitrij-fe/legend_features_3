import { Button, Flex, Layout } from 'antd';
import { NavLink, useNavigate } from 'react-router';
import { CarryOutOutlined, SmileOutlined } from '@ant-design/icons';
import Routers from './components/Routers';
import AppSider from './components/AppSider';
import { Content } from 'antd/es/layout/layout';
import { useAppDispatch, useAppSelector } from './store';
import { useEffect } from 'react';
import { setAuth } from './store/slices/authSlice.ts';

function App() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(setAuth(true));
      navigate('/');
    } else {
      dispatch(setAuth(false));
      navigate('/login');
    }
  }, []);

  return (
    <Layout>
      {isAuth && (
        <AppSider theme={'light'}>
          <Flex vertical gap={10}>
            <NavLink to={'/'} end>
              <Button
                icon={<CarryOutOutlined />}
                variant={'solid'}
                color={'primary'}
                size={'large'}
                style={{
                  width: '100%',
                }}
              >
                Список задач
              </Button>
            </NavLink>
            <NavLink to={'/profile'}>
              <Button
                icon={<SmileOutlined />}
                variant={'solid'}
                color={'primary'}
                size={'large'}
                style={{
                  width: '100%',
                }}
              >
                Профиль
              </Button>
            </NavLink>
          </Flex>
        </AppSider>
      )}
      <Content>
        <Routers />
      </Content>
    </Layout>
  );
}

export default App;
