import { FC } from 'react';
import { List } from 'antd';
import { Todo } from '../../types/todoTypes.ts';
import TodoItem from '../TodoItem';

interface TodoListProps {
  todoItems: Todo[];
}

const TodoList: FC<TodoListProps> = (props) => {
  const { todoItems } = props;

  return (
    <List
      itemLayout="horizontal"
      dataSource={todoItems}
      renderItem={(item) => (
        <TodoItem id={item.id} title={item.title} isDone={item.isDone} />
      )}
    />
  );
};

export default TodoList;
