import { Tabs, TabsProps } from 'antd';
import { FC } from 'react';
import { TodoInfo, TodoInfoFilter } from '../../types/todoTypes.ts';
import { isTodoStatus } from '../../helpers/isTodoStatus.ts';

interface TodoStatusFilterProps {
  todoInfo: TodoInfo;
  setActiveInfoStatus: (status: TodoInfoFilter) => void;
}

const TodoStatusFilter: FC<TodoStatusFilterProps> = (props) => {
  const { todoInfo, setActiveInfoStatus } = props;

  const handleChangeStatusFilter = (key: string) => {
    if (isTodoStatus(key)) {
      setActiveInfoStatus(key);
    }
  };

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: `Все (${todoInfo.all})`,
    },
    {
      key: 'inWork',
      label: `В работе (${todoInfo.inWork})`,
    },
    {
      key: 'completed',
      label: `Сделано (${todoInfo.completed})`,
    },
  ];

  return (
    <Tabs
      defaultActiveKey="all"
      items={items}
      size={'large'}
      centered
      tabBarStyle={{ fontWeight: 700 }}
      tabBarGutter={50}
      onChange={handleChangeStatusFilter}
    />
  );
};

export default TodoStatusFilter;
