import { FC, useState } from 'react';
import { Button, Form, notification, Typography } from 'antd';
import { UserRegistration } from '../../types/authTypes.ts';
import { register } from '../../services/authServices.ts';
import { Link } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import registerSchema from '../../schemas/register.ts';
import RHFInput from '../../components/Form/RHFInput.tsx';
export interface SingUpFormFields extends UserRegistration {
  confirmPassword: UserRegistration['password'];
}

const RegisterPage: FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const { handleSubmit, control } = useForm<SingUpFormFields>({
    resolver: zodResolver(registerSchema),
  });

  const handleUserSignUp: SubmitHandler<UserRegistration> = async (
    userData,
  ) => {
    try {
      await register(userData);

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
    <Form
      name="basic"
      style={{ maxWidth: 420 }}
      onFinish={handleSubmit(handleUserSignUp)}
      autoComplete="off"
      layout={'vertical'}
      size={'large'}
    >
      <Typography.Title level={2}>Регистрация</Typography.Title>

      <RHFInput name="username" label="Имя пользователя" control={control} />

      <RHFInput name="login" label="Логин" control={control} />

      <RHFInput
        name="password"
        label="Пароль"
        control={control}
        type="password"
      />

      <RHFInput
        name="confirmPassword"
        label="Повторите пароль"
        control={control}
        type="password"
      />

      <RHFInput
        name="email"
        label="Почтовый адрес"
        control={control}
        type="email"
      />

      <RHFInput
        name="phoneNumber"
        label="Телефон"
        control={control}
        type="tel"
      />

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
      <Form.Item label={null}>
        <Link to={'/login'}>Войти</Link>
      </Form.Item>
    </Form>
  );
};

export default RegisterPage;
