import { type FC, useEffect, useState } from 'react';
import styles from './TodoPage.module.scss';
import TodoTitle from '../../components/TodoTitle';
import TodoList from '../../components/TodoList';
import { getTodos } from '../../api/todoAPI.ts';
import type { Todo, TodoStatus } from '../../types/todoTypes';
import TodoInfo from '../../components/TodoInfo';

const TodoPage: FC = () => {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [todoInfo, setTodoInfo] = useState({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [activeStatus, setActiveStatus] = useState<TodoStatus>('all');

  useEffect(() => {
    updateTodo();
  }, [activeStatus]);

  async function updateTodo(): Promise<void> {
    try {
      const todoData = await getTodos(activeStatus);

      setTodoItems(todoData.data);

      if (todoData.info) {
        setTodoInfo(todoData.info);
      }
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className={styles.todo}>
      <TodoTitle />
      <TodoInfo info={todoInfo} setStatus={setActiveStatus} />
      <TodoList tasks={todoItems} updateTodo={updateTodo} />
    </div>
  );
};

export default TodoPage;
