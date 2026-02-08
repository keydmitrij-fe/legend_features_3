import { FC } from 'react';
import AuthImage from '../../image/auth_illustration.png';
import AuthForm from '../../components/AuthForm';
import { Flex, Layout } from 'antd';

const AuthPage: FC = () => {
  return (
    <Layout>
      <Flex align={'center'} justify={'center'}>
        <img alt="" src={AuthImage} width={700} height={700} />
        <AuthForm />
      </Flex>
    </Layout>
  );
};

export default AuthPage;
