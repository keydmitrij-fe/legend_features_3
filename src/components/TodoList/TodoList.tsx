import { FC } from 'react';
import { List } from 'antd';
import { Todo } from '../../types/todoTypes.ts';
import TodoItem from '../TodoItem';

interface TodoListProps {
  todoItems: Todo[];
  updateTodo: () => Promise<void>;
}

const TodoList: FC<TodoListProps> = (props) => {
  const { todoItems, updateTodo } = props;

  return (
    <List
      itemLayout="horizontal"
      dataSource={todoItems}
      renderItem={(item) => (
        <TodoItem
          id={item.id}
          title={item.title}
          isDone={item.isDone}
          updateTodo={updateTodo}
        />
      )}
    />
  );
};

export default TodoList;
