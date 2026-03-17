import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import {
  getUserProfile,
  updateUserProfile,
} from '../../services/usersServices.ts';
import { User, UserRequest } from '../../types/usersTypes.ts';
import {
  Button,
  Form,
  FormProps,
  Input,
  notification,
  Space,
  Spin,
} from 'antd';
import {
  VALIDATION_INPUTS_MESSAGE,
  VALIDATION_INPUTS_RULES,
} from '../../constants/validationRules.ts';

type FieldType = {
  username?: string;
  email?: string;
  phoneNumber?: string;
};

const UserPage: FC = () => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState<User>({
    id: 0,
    username: '',
    email: '',
    date: '',
    isBlocked: false,
    roles: [],
    phoneNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      if (id) {
        const response = await getUserProfile(+id);

        setUserProfile(response.data);
      }
    } catch (e) {
      console.error(e);
      notification.error({
        title: 'Ошибка!',
        description: 'Ошибка при получении профиля пользователя',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userRequest: UserRequest) => {
    try {
      setIsLoading(true);
      if (id) {
        await updateUserProfile(+id, userRequest);
      }

      notification.success({
        title: 'Успех',
        description: 'Профиль обновлён',
      });
    } catch (e) {
      console.error(e);
      notification.error({
        title: 'Ошибка!',
        description: 'Ошибка при редактировании профиля пользователя',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const { username, email, phoneNumber } = values;

    if (email === userProfile.email) {
      updateProfile({
        username,
        phoneNumber,
      })
        .then(() => fetchUserProfile())
        .then(() => setIsDisabled(true));
    } else {
      updateProfile(values)
        .then(() => fetchUserProfile())
        .then(() => setIsDisabled(true));
    }
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Form
      name="profile"
      onFinish={onFinish}
      layout={'vertical'}
      disabled={isDisabled}
    >
      <Form.Item<FieldType>
        label="Имя пользователя:"
        name="username"
        rules={[
          {
            required: true,
            message: VALIDATION_INPUTS_MESSAGE.REQUIRED,
          },
          {
            min: VALIDATION_INPUTS_RULES.USERNAME.MIN_LENGTH,
            message: VALIDATION_INPUTS_MESSAGE.USERNAME.MIN_LENGTH,
          },
          {
            max: VALIDATION_INPUTS_RULES.USERNAME.MAX_LENGTH,
            message: VALIDATION_INPUTS_MESSAGE.USERNAME.MAX_LENGTH,
          },
          {
            pattern: VALIDATION_INPUTS_RULES.USERNAME.REGEX,
            message: VALIDATION_INPUTS_MESSAGE.USERNAME.REGEX,
          },
        ]}
        initialValue={userProfile.username}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Email пользователя:"
        name="email"
        rules={[
          {
            required: true,
            message: VALIDATION_INPUTS_MESSAGE.REQUIRED,
          },
          {
            pattern: VALIDATION_INPUTS_RULES.EMAIL.REGEX,
            message: VALIDATION_INPUTS_MESSAGE.EMAIL.REGEX,
          },
        ]}
        initialValue={userProfile.email}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Номер телефона:"
        name="phoneNumber"
        rules={[
          {
            pattern: VALIDATION_INPUTS_RULES.PHONE_NUMBER.REGEX,
            message: VALIDATION_INPUTS_MESSAGE.PHONE_NUMBER.REGEX,
          },
        ]}
        initialValue={userProfile.phoneNumber}
      >
        <Input />
      </Form.Item>

      <Space>
        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="button"
            disabled={false}
            onClick={() => setIsDisabled(false)}
          >
            Редактировать
          </Button>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>

        <Form.Item label={null}>
          <Link to={'/users'}>
            <Button type="primary" htmlType="button" disabled={false}>
              Вернуться
            </Button>
          </Link>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default UserPage;
