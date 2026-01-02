import React from 'react';
import './TodoList.scss';
import TodoItem from '../TodoItem';

const TodoList = (props) => {
  // eslint-disable-next-line react/prop-types
  const { tasksData, updateTask, deleteTask } = props;

  return (
    <ul className={'todo__list list'}>
      {/* eslint-disable-next-line react/prop-types */}
      {tasksData.map((task) => (
        <TodoItem
          key={task.id}
          id={task.id}
          title={task.title}
          isDone={task.isDone}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}
    </ul>
  );
};

export default TodoList;
