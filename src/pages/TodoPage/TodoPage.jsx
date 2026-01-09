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

  function validationInput(title) {
    const titleLength = title.trim().length;

    if (titleLength === 0) {
      alert('Это поле не может быть пустым');
      return;
    }

    if (titleLength < 2) {
      alert('Минимальная длина текста 2 символа');
      return;
    }

    if (titleLength > 64) {
      alert('Максимальная длина текста 64 символа');
      return;
    }

    return true;
  }

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
      <TodoTitle updateTodo={updateTodo} validationInput={validationInput} />
      <TodoInfo
        info={tasksData.info}
        status={activeStatus}
        setStatus={setActiveStatus}
        updateTodo={updateTodo}
      />
      <TodoList
        tasks={tasksData.data}
        updateTodo={updateTodo}
        validationInput={validationInput}
      />
    </div>
  );
};

export default TodoPage;
