import React, { useEffect, useState } from 'react';
import './TodoPage.scss';
import Field from '../../components/Field';
import Info from '../../components/Info';
import TodoList from '../../components/TodoList';
import { getTodo } from '../../api/todoAPI';

const TodoPage = () => {
  const [tasksData, setTasksData] = useState({
    data: [],
    info: {},
  });
  const [activeStatus, setActiveStatus] = useState('all');

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
      <Field updateTasks={updateTasks} />
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
