import React, { useEffect, useState } from 'react';
import './TodoPage.scss';
import TodoTitle from '../../components/TodoTitle';
import Info from '../../components/Info';
import TodoList from '../../components/TodoList';
import { getTodo } from '../../api/todoAPI';

const TodoPage = () => {
  const [tasksData, setTasksData] = useState({
    data: [],
    info: {},
  });

  const [activeStatus, setActiveStatus] = useState('all');
  const [error, setError] = useState('');

  function validationInput(title) {
    if (title.trim().length === 0) {
      setError('Это поле не может быть пустым');
      return;
    }

    if (title.trim().length < 2) {
      setError('Минимальная длина текста 2 символа');
      return;
    }

    if (title.trim().length > 64) {
      setError('Максимальная длина текста 64 символа');
      return;
    }

    return true;
  }

  useEffect(() => {
    updateTasks();
  }, [activeStatus]);

  async function updateTasks() {
    try {
      const tasksData = await getTodo(activeStatus);
      setTasksData({ data: tasksData.data, info: tasksData.info });
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="todo">
      <TodoTitle
        updateTasks={updateTasks}
        validationInput={validationInput}
        error={error}
      />
      <Info
        info={tasksData.info}
        status={activeStatus}
        setStatus={setActiveStatus}
        updateTasks={updateTasks}
      />
      <TodoList tasks={tasksData.data} updateTasks={updateTasks} />
    </div>
  );
};

export default TodoPage;
