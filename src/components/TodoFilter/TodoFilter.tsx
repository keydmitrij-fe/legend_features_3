import { Tabs, TabsProps } from 'antd';
import type { TodoFilter, TodoStatus } from '../../types/todoTypes.ts';
import { FC } from 'react';
import { isTodoStatus } from '../../helpers/isTodoStatus.ts';

type TodoFilterProps = {
  TodoStatus: TodoFilter;
  setActiveFilter: (filter: TodoStatus) => void;
};

const TodoFilter: FC<TodoFilterProps> = (props) => {
  const { TodoStatus, setActiveFilter } = props;

  const handleChangeFilter = (key: string) => {
    if (isTodoStatus(key)) {
      setActiveFilter(key);
    }
  };

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: `Все (${TodoStatus.all})`,
    },
    {
      key: 'inWork',
      label: `В работе (${TodoStatus.inWork})`,
    },
    {
      key: 'completed',
      label: `Сделано (${TodoStatus.completed})`,
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
      onChange={(key) => handleChangeFilter(key)}
    />
  );
};

export default TodoFilter;
