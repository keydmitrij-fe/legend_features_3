import { Flex, Layout } from 'antd';
import Routers from './components/Routers';
import AppSider from './components/AppSider';
import { Content } from 'antd/es/layout/layout';
import { useAppDispatch, useAppSelector } from './store';
import { useEffect, useState } from 'react';
import { setAuth } from './store/slices/authSlice.ts';
import loginImage from './assets/image/auth_illustration.png';

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(setAuth(true));
    } else {
      dispatch(setAuth(false));
    }
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return;
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
