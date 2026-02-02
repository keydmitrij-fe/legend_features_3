import { Button, Flex, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router';
import TodoPage from './pages/TodoPage';
import Profile from './pages/Profile';
import { CarryOutOutlined, SmileOutlined } from '@ant-design/icons';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Sider theme={'light'}>
          <Flex vertical gap={10}>
            <NavLink to={'/'} end>
              <Button
                icon={<CarryOutOutlined />}
                variant={'solid'}
                color={'primary'}
                size={'large'}
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
              >
                Профиль
              </Button>
            </NavLink>
          </Flex>
        </Sider>

        <Routes>
          <Route path={'/'} element={<TodoPage />}></Route>
          <Route path={'profile'} element={<Profile />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
