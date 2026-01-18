import React, { useEffect, useState } from 'react';
import styles from './TodoPage.module.scss';
import TodoTitle from '../../components/TodoTitle';
import TodoInfo from '../../components/TodoInfo';
import TodoList from '../../components/TodoList';
import { getTodos } from '../../api/todoAPI';

const TodoPage = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [todoInfo, setTodoInfo] = useState({ all: 0, completed: 0, inWork: 0 });
  const [activeStatus, setActiveStatus] = useState('all');

  useEffect(() => {
    updateTodo();
  }, [activeStatus]);

  async function updateTodo() {
    try {
      const todoData = await getTodos(activeStatus);
      setTodoItems(todoData.data);
      setTodoInfo(todoData.info);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className={styles.todo}>
      <TodoTitle updateTodo={updateTodo} />
      <TodoInfo
        info={todoInfo}
        status={activeStatus}
        setStatus={setActiveStatus}
        updateTodo={updateTodo}
      />
      <TodoList tasks={todoItems} updateTodo={updateTodo} />
    </div>
  );
};

export default TodoPage;
