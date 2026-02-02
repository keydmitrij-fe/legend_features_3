import { Layout } from 'antd';
import TodoPage from './pages/TodoPage';
import Sider from 'antd/es/layout/Sider';

function App() {
  return (
    <Layout>
      <Sider theme={'light'}>Sider</Sider>
      <TodoPage />
    </Layout>
  );
}

export default App;
