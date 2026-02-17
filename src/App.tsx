import { Button, Flex, Layout } from 'antd';
import { NavLink } from 'react-router';
import { CarryOutOutlined, SmileOutlined } from '@ant-design/icons';
import Routers from './components/Routers';
import AppSider from './components/AppSider';
import { Content } from 'antd/es/layout/layout';

function App() {
  return (
    <Layout>
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
      <Content>
        <Routers />
      </Content>
    </Layout>
  );
}

export default App;
