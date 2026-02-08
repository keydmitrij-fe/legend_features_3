import { FC } from 'react';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import AuthFormTitle from '../AuthFormTitle';

const AuthForm: FC = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const INPUT_RULES = {
    MIN_LENGTH: 2,
    MAX_LENGTH: 64,
    REQUIRED_MESSAGE: 'Это поле не может быть пустым',
    MIN_MESSAGE: 'Минимальная длина текста 2 символа',
    MAX_MESSAGE: 'Максимальная длина текста 64 символа',
  };

  return (
    <Flex vertical>
      <AuthFormTitle
        title={'Login to your Account'}
        description={'See what is going on with your business'}
      />
      <Form
        name="login"
        style={{ maxWidth: 420 }}
        layout={'vertical'}
        requiredMark={false}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label={'Email'}
          rules={[{ required: true, message: INPUT_RULES.REQUIRED_MESSAGE }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label={'Password'}
          rules={[{ required: true, message: INPUT_RULES.REQUIRED_MESSAGE }]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>
            <a href="">Забыли пароль?</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" size={'large'}>
            Войти
          </Button>
          Еще не зарегистрировались? <a href="">Создать учетную запись</a>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default AuthForm;
