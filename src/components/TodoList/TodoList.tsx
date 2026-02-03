import { FC } from 'react';
import { List } from 'antd';
import { Todo } from '../../types/todoTypes.ts';
import TodoItem from '../TodoItem';

type TodoListProps = {
  items: Todo[];
  updateTodo: () => Promise<void>;
};

const TodoList: FC<TodoListProps> = (props) => {
  const { items, updateTodo } = props;

  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      size={'large'}
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
