import React, { useCallback, useEffect, useState } from 'react';
import './Todo.scss';
import Field from '../Field';
import Info from '../Info';
import TodoList from '../TodoList';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [tasksInfo, setTasksInfo] = useState({});
  const [activeStatus, setActiveStatus] = useState('all');

  const renderTasks = useCallback(() => {
    fetch(`https://easydev.club/api/v1/todos`)
      .then((response) => response.json())
      .then((tasksData) => {
        setTasks(tasksData.data);
      });
  }, []);
  const renderTasksInfo = useCallback(() => {
    fetch(`https://easydev.club/api/v1/todos`)
      .then((response) => response.json())
      .then((tasksData) => {
        setTasksInfo(tasksData.info);
      });
  }, []);

  useEffect(() => {
    renderTasks();
    renderTasksInfo();
  }, []);

  const filterTask = useCallback((status) => {
    fetch(`https://easydev.club/api/v1/todos?filter=${status}`)
      .then((response) => response.json())
      .then((filterData) => setTasks(filterData.data));

    renderTasksInfo();
  }, []);

  const updateTask = (id, title, isChecked) => {
    fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ isDone: isChecked, title: title }),
    }).then(() => {
      filterTask(activeStatus);
    });
  };

  const addTask = (title) => {
    fetch('https://easydev.club/api/v1/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isDone: false,
        title: title,
      }),
    }).then(() => {
      renderTasks();
      renderTasksInfo();
    });
  };

  const deleteTask = (id) => {
    const answer = confirm('Удалить эту задачу?');

    if (answer) {
      fetch(`https://easydev.club/api/v1/todos/${id}`, {
        method: 'DELETE',
      }).then(() => {
        renderTasks();
        renderTasksInfo();
      });
    }
  };

  return (
    <div className="todo">
      <Field addTask={addTask} />
      <Info
        tasksAmount={tasksInfo}
        onFilterTask={filterTask}
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
      />
      <TodoList
        tasksData={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default Todo;
