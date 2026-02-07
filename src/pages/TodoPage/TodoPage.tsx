import { type FC, useEffect, useState } from 'react';
import TodoTitle from '../../components/TodoTitle';
import TodoList from '../../components/TodoList';
import { getTodos } from '../../api/todoAPI.ts';
import type { Filters, Todo } from '../../types/todoTypes';
import TodoFilter from '../../components/TodoFilter';
import { Content } from 'antd/es/layout/layout';
import { Alert, Layout } from 'antd';
import { AxiosError, isAxiosError } from 'axios';

const TodoPage: FC = () => {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [todoFilter, setTodoFilter] = useState({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [activeFilter, setActiveFilter] = useState<Filters>('all');
  const [error, setError] = useState<AxiosError | Error | null>(null);

  useEffect(() => {
    updateTodo();

    const refreshInterval = setInterval(updateTodo, 5000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [activeFilter]);

  async function updateTodo() {
    try {
      const todoData = await getTodos(activeFilter);

      setTodoItems(todoData.data);

      if (todoData.info) {
        setTodoFilter(todoData.info);
      }
      setError(null);
    } catch (e) {
      if (isAxiosError(e) || e instanceof Error) {
        setError(e);
      }
    }
  }

  return (
    <Layout>
      <Content>
        {error && (
          <Alert
            title={error.name}
            description={error.message}
            type="error"
            showIcon
          />
        )}
        <TodoTitle updateTodo={updateTodo} />
        <TodoFilter filters={todoFilter} setActiveFilter={setActiveFilter} />
        <TodoList items={todoItems} updateTodo={updateTodo} />
      </Content>
    </Layout>
  );
};

export default TodoPage;
