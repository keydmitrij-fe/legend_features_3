import React from 'react';
import './TodoList.scss';
import TodoItem from '../TodoItem/index.jsx';

const TodoList = () => {
  return (
    <ul className={'todo__list list'}>
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </ul>
  );
};

export default TodoList;
