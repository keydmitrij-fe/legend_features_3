import { type FC, useState } from 'react';
import TodoTitle from '../../components/TodoTitle';
import TodoList from '../../components/TodoList';
import TodoStatusFilter from '../../components/TodoStatusFilter';
import { Content } from 'antd/es/layout/layout';
import { Layout, notification } from 'antd';
import { TodoInfoFilter } from '../../types/todoTypes.ts';
import { useTodos } from '../../hooks/useTodos.ts';
import { Spin } from 'antd';

const TodoPage: FC = () => {
  const [activeInfoStatus, setActiveInfoStatus] =
    useState<TodoInfoFilter>('all');

  //   } catch (e) {
  //     console.error(e);
  //     notification.error({
  //       title: 'Ошибка!',
  //       description: 'Ошибка при загрузке списка задач',
  //     });
  //   }

  const { todos, isError } = useTodos(activeInfoStatus);

  if (isError) {
    notification.error({
      title: 'Ошибка!',
      description: 'Ошибка при загрузке списка задач',
    });
  }

  return (
    <Layout>
      <Content>
        <TodoTitle />
        <TodoStatusFilter
          todoInfoStatuses={
            todos?.data.info
              ? todos.data.info
              : { all: 0, completed: 0, inWork: 0 }
          }
          setActiveInfoStatus={setActiveInfoStatus}
        />
        {todos ? <TodoList todoItems={todos.data.data} /> : <Spin />}
      </Content>
    </Layout>
  );
};

export default TodoPage;
