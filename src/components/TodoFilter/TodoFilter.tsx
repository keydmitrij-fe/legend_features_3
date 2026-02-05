import { Tabs, TabsProps } from 'antd';
import type { Filters, TodoFilter } from '../../types/todoTypes.ts';
import { FC } from 'react';

type TodoFilterProps = {
  filters: TodoFilter;
  setActiveFilter: (filter: Filters) => void;
};

const TodoFilter: FC<TodoFilterProps> = (props) => {
  const { filters, setActiveFilter } = props;

  const handleChangeFilter = (key: Filters) => {
    setActiveFilter(key);
  };

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: `Все (${filters.all})`,
    },
    {
      key: 'inWork',
      label: `В работе (${filters.inWork})`,
    },
    {
      key: 'completed',
      label: `Сделано (${filters.completed})`,
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
      onChange={(key) => handleChangeFilter(key as Filters)}
    />
  );
};

export default TodoFilter;
