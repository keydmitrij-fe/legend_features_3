import { FC } from 'react';
import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  notification,
  Typography,
} from 'antd';
import { AuthData } from '../../types/authTypes.ts';
import { Link, useNavigate } from 'react-router';
import { VALIDATION_RULES } from '../../constants/validationRules.ts';
import { login } from '../../services/authServices.ts';
import { useAppDispatch } from '../../store';
import { setAuth } from '../../store/slices/authSlice.ts';
import { tokenManager } from '../../helpers/tokenManager.ts';
import loginImage from '../../assets/image/auth_illustration.png';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish: FormProps['onFinish'] = async (authData: AuthData) => {
    try {
      const response = await login(authData);

      localStorage.setItem('token', response.data.refreshToken);
      tokenManager.setToken(response.data.accessToken);

      dispatch(setAuth(true));

      navigate('/');
    } catch (e) {
      console.error(e);
      notification.error({
        title: 'Ошибка!',
        description: 'Неверные логин или пароль',
        duration: 5,
      });
    }
  };

  return (
    <Flex align={'center'} justify={'center'}>
      <img width={1000} height={1000} src={loginImage} alt="" />
      <Form
        name="basic"
        style={{ minWidth: 420 }}
        onFinish={onFinish}
        autoComplete="off"
        layout={'vertical'}
        size={'large'}
      >
        <Form.Item>
          <Typography.Title level={2}>Войти в свой аккаунт</Typography.Title>
        </Form.Item>

        <Form.Item
          label="Логин"
          name="login"
          rules={[
            { required: true, message: VALIDATION_RULES.REQUIRED_MESSAGE },
            {
              min: VALIDATION_RULES.LOGIN.MIN_LENGTH,
              message: VALIDATION_RULES.LOGIN.MIN_MESSAGE,
            },
            {
              max: VALIDATION_RULES.LOGIN.MAX_LENGTH,
              message: VALIDATION_RULES.LOGIN.MAX_MESSAGE,
            },
            {
              pattern: VALIDATION_RULES.LOGIN.REGEX,
              message: VALIDATION_RULES.LOGIN.REGEX_MESSAGE,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            { required: true, message: VALIDATION_RULES.REQUIRED_MESSAGE },
            {
              min: VALIDATION_RULES.PASSWORD.MIN_LENGTH,
              message: VALIDATION_RULES.PASSWORD.MIN_MESSAGE,
            },
            {
              max: VALIDATION_RULES.PASSWORD.MAX_LENGTH,
              message: VALIDATION_RULES.PASSWORD.MAX_MESSAGE,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>

        <Form.Item label={null}>
          <Link to={'/register'}>Зарегистрироваться</Link>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginPage;
