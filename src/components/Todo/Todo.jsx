import React from 'react';
import './Todo.scss';
import Field from '../Field/index.jsx';
import Info from '../Info/index.jsx';
import TodoList from '../TodoList/index.jsx';

const Todo = () => {
  return (
    <div className="todo">
      <Field />
      <Info />
      <TodoList></TodoList>
    </div>
  );
};

export default Todo;
