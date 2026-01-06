import React from 'react';
import './TodoList.scss';
import TodoItem from '../TodoItem';

const TodoList = (props) => {
  // eslint-disable-next-line react/prop-types
  const { tasks, updateTodo } = props;

  return (
    <ul className={'todo__list list'}>
      {/* eslint-disable-next-line react/prop-types */}
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          id={task.id}
          title={task.title}
          isDone={task.isDone}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
