import { FC } from 'react';
import Sider, { SiderProps } from 'antd/es/layout/Sider';
import { useAppSelector } from '../../store';
import { NavLink } from 'react-router';
import { Button, Flex } from 'antd';
import {
  CarryOutOutlined,
  SmileOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import usePermissions from '../../hooks/usePermissions.ts';

const AppSider: FC<SiderProps> = (props) => {
  const { ...rest } = props;

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isAdminOrModerator = usePermissions();

  return (
    isAuth && (
      <Sider {...rest}>
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
          {isAdminOrModerator && (
            <NavLink to={'/users'}>
              <Button
                icon={<UserSwitchOutlined />}
                variant={'solid'}
                color={'primary'}
                size={'large'}
                style={{
                  width: '100%',
                }}
              >
                Пользователи
              </Button>
            </NavLink>
          )}
        </Flex>
      </Sider>
    )
  );
};

export default AppSider;
