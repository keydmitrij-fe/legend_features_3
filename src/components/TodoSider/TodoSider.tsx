import { FC } from 'react';
import Sider, { SiderProps } from 'antd/es/layout/Sider';

const TodoSider: FC<SiderProps> = (props) => {
  const { children, ...rest } = props;

  return <Sider {...rest}>{children}</Sider>;
};

export default TodoSider;
