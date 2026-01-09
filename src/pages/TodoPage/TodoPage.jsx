import React, { useEffect, useState } from 'react';
import styles from './TodoPage.module.scss';
import TodoTitle from '../../components/TodoTitle';
import TodoInfo from '../../components/TodoInfo';
import TodoList from '../../components/TodoList';
import { getTodo } from '../../api/todoAPI';

const TodoPage = () => {
  const [tasksData, setTasksData] = useState({
    data: [],
    info: {},
  });
  const [activeStatus, setActiveStatus] = useState('all');

  useEffect(() => {
    updateTodo();
  }, [activeStatus]);

  async function updateTodo() {
    try {
      const tasksData = await getTodo(activeStatus);
      setTasksData({ data: tasksData.data, info: tasksData.info });
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className={styles.todo}>
      <TodoTitle updateTodo={updateTodo} />
      <TodoInfo
        info={tasksData.info}
        status={activeStatus}
        setStatus={setActiveStatus}
        updateTodo={updateTodo}
      />
      <TodoList tasks={tasksData.data} updateTodo={updateTodo} />
    </div>
  );
};

export default TodoPage;
