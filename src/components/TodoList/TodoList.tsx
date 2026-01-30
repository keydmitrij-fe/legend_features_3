import React from 'react';
import { List } from 'antd';
import { Todo } from '../../types/todoTypes.ts';
import TodoItem from '../TodoItem';

type TodoListProps = {
  tasks: Todo[];
};

const TodoList: React.FC<TodoListProps> = (props) => {
  const { tasks } = props;

  return (
    <List
      itemLayout="horizontal"
      dataSource={tasks}
      size={'large'}
      renderItem={(item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          title={item.title}
          isDone={item.isDone}
        />
      )}
    />
  );
};

export default TodoList;
