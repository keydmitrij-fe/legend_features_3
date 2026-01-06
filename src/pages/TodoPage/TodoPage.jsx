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
    const titleLength = title.trim().length;

    if (titleLength === 0) {
      setError('Это поле не может быть пустым');
      return;
    }

    if (titleLength < 2) {
      setError('Минимальная длина текста 2 символа');
      return;
    }

    if (titleLength > 64) {
      setError('Максимальная длина текста 64 символа');
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
    <div className="todo">
      <TodoTitle
        updateTodo={updateTodo}
        validationInput={validationInput}
        error={error}
      />
      <Info
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
