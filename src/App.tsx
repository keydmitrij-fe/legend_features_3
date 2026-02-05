import { Button, Flex, Layout } from 'antd';
import { BrowserRouter, NavLink } from 'react-router';
import { CarryOutOutlined, SmileOutlined } from '@ant-design/icons';
import Routers from './components/Routers';
import TodoSider from './components/TodoSider';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <TodoSider theme={'light'}>
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
        </TodoSider>

        <Routers />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
