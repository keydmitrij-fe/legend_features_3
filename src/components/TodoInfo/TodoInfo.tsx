import { Tabs, TabsProps } from 'antd';
import type { TodoInfo, TodoStatus } from '../../types/todoTypes.ts';
import { stringToStatus } from '../../helpers/stringToStatus.ts';
import { FC } from 'react';

type TodoInfoProps = {
  info: TodoInfo;
  setStatus: (status: TodoStatus) => void;
};

const TodoInfo: FC<TodoInfoProps> = (props) => {
  const { info, setStatus } = props;

  const onChange = (key: string) => {
    if (stringToStatus(key)) {
      setStatus(key);
    }
  };

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: `Все (${info.all})`,
    },
    {
      key: 'inWork',
      label: `В работе (${info.inWork})`,
    },
    {
      key: 'completed',
      label: `Сделано (${info.completed})`,
    },
  ];

  return (
    <Tabs
      defaultActiveKey="all"
      items={items}
      onChange={onChange}
      size={'large'}
      centered
      tabBarStyle={{ fontWeight: 700 }}
      tabBarGutter={50}
    />
  );
};

export default TodoInfo;
