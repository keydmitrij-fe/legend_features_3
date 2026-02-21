import { FC, useState } from 'react';
import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  notification,
  Typography,
} from 'antd';
import { UserRegistration } from '../../types/authTypes.ts';
import { register } from '../../services/authServices.ts';
import { Link } from 'react-router';
import registerImage from '../../assets/image/auth_illustration.png';
import { VALIDATION_RULES } from '../../constants/validationRules.ts';

const RegisterPage: FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const onFinish: FormProps['onFinish'] = async (
    userRegistration: UserRegistration,
  ) => {
    try {
      await register(userRegistration);

      setIsRegistered(true);
    } catch {
      notification.error({
        title: 'Ошибка!',
        description: 'Такой логин уже существует',
      });
    }
  };

  if (isRegistered) {
    return (
      <>
        <Typography.Title level={2}>
          Регистрация прошла успешно!
        </Typography.Title>
        <Link to={'/login'}>Войти в систему</Link>
      </>
    );
  }

  return (
    <Flex align={'center'} justify={'center'}>
      <img width={1000} height={1000} src={registerImage} alt="" />
      <Form
        name="basic"
        style={{ minWidth: 420 }}
        onFinish={onFinish}
        autoComplete="off"
        layout={'vertical'}
        size={'large'}
      >
        <Form.Item>
          <Typography.Title level={2}>Регистрация</Typography.Title>
        </Form.Item>

        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[
            { required: true, message: VALIDATION_RULES.REQUIRED_MESSAGE },
            {
              min: VALIDATION_RULES.USERNAME.MIN_LENGTH,
              message: VALIDATION_RULES.USERNAME.MIN_MESSAGE,
            },
            {
              max: VALIDATION_RULES.USERNAME.MAX_LENGTH,
              message: VALIDATION_RULES.USERNAME.MAX_MESSAGE,
            },
            {
              pattern: VALIDATION_RULES.USERNAME.REGEX,
              message: VALIDATION_RULES.USERNAME.REGEX_MESSAGE,
            },
          ]}
        >
          <Input />
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

        <Form.Item
          label="Повторите пароль"
          name="confirmPassword"
          dependencies={['password']}
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
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Новый пароль, который вы ввели, не совпадает!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Почтовый адрес"
          name="email"
          rules={[
            { required: true, message: VALIDATION_RULES.REQUIRED_MESSAGE },
            {
              pattern: VALIDATION_RULES.EMAIL.REGEX,
              message: VALIDATION_RULES.EMAIL.REGEX_MESSAGE,
            },
          ]}
        >
          <Input type={'email'} />
        </Form.Item>

        <Form.Item
          label="Телефон"
          name="phoneNumber"
          rules={[
            {
              pattern: VALIDATION_RULES.PHONE_NUMBER.REGEX,
              message: VALIDATION_RULES.PHONE_NUMBER.REGEX_MESSAGE,
            },
          ]}
        >
          <Input type={'tel'} />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default RegisterPage;
