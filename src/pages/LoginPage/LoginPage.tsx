import { FC } from 'react';
import { Button, Form, FormProps, Input, notification, Typography } from 'antd';
import { AuthData } from '../../types/authTypes.ts';
import { Link, useNavigate } from 'react-router';
import { login } from '../../services/authServices.ts';
import { useAppDispatch } from '../../store';
import { setAuth } from '../../store/slices/authSlice.ts';
import { tokenManager } from '../../helpers/TokenManager.ts';
import {
  VALIDATION_INPUTS_MESSAGE,
  VALIDATION_INPUTS_RULES,
} from '../../constants/validationRules.ts';

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
    <Form
      name="basic"
      style={{ maxWidth: 420 }}
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
          {
            required: true,
            message: VALIDATION_INPUTS_MESSAGE.REQUIRED,
          },
          {
            min: VALIDATION_INPUTS_RULES.LOGIN.MIN_LENGTH,
            message: VALIDATION_INPUTS_MESSAGE.LOGIN.MIN_LENGTH,
          },
          {
            max: VALIDATION_INPUTS_RULES.LOGIN.MAX_LENGTH,
            message: VALIDATION_INPUTS_MESSAGE.LOGIN.MAX_LENGTH,
          },
          {
            pattern: VALIDATION_INPUTS_RULES.LOGIN.REGEX,
            message: VALIDATION_INPUTS_MESSAGE.LOGIN.REGEX,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: VALIDATION_INPUTS_MESSAGE.REQUIRED,
          },
          {
            min: VALIDATION_INPUTS_RULES.PASSWORD.MIN_LENGTH,
            message: VALIDATION_INPUTS_MESSAGE.PASSWORD.MIN_LENGTH,
          },
          {
            max: VALIDATION_INPUTS_RULES.PASSWORD.MAX_LENGTH,
            message: VALIDATION_INPUTS_MESSAGE.PASSWORD.MAX_LENGTH,
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
  );
};

export default LoginPage;
