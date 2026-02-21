import { type FC, useEffect, useState } from 'react';
import TodoTitle from '../../components/TodoTitle';
import TodoList from '../../components/TodoList';
import TodoStatusFilter from '../../components/TodoStatusFilter';
import { Content } from 'antd/es/layout/layout';
import { Layout, notification } from 'antd';
import { Todo, TodoInfoFilter } from '../../types/todoTypes.ts';
import { getTodos } from '../../services/todoServices.ts';

const TodoPage: FC = () => {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [todoInfoStatuses, setTodoInfoStatuses] = useState({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [activeInfoStatus, setActiveInfoStatus] =
    useState<TodoInfoFilter>('all');

  useEffect(() => {
    updateTodo();

    const refreshInterval = setInterval(updateTodo, 5000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [activeInfoStatus]);

  const updateTodo = async () => {
    try {
      const response = await getTodos(activeInfoStatus);

      setTodoItems(response.data.data);

      if (response.data.info) {
        setTodoInfoStatuses(response.data.info);
      }
    } catch (e) {
      console.error(e);
      notification.error({
        title: 'Ошибка!',
        description: 'Ошибка при загрузке списка задач',
      });
    }
  };

  return (
    <Layout>
      <Content>
        <TodoTitle updateTodo={updateTodo} />
        <TodoStatusFilter
          todoInfoStatuses={todoInfoStatuses}
          setActiveInfoStatus={setActiveInfoStatus}
        />
        <TodoList todoItems={todoItems} updateTodo={updateTodo} />
      </Content>
    </Layout>
  );
};

export default TodoPage;
