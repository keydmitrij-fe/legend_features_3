import { type FC } from 'react';
import styles from './TodoList.module.scss';
import TodoItem from '../TodoItem';
import type { Todo } from '../../types/todoTypes.ts';

type TodoListProps = {
  tasks: Todo[];
  updateTodo: () => Promise<void>;
};

const TodoList: FC<TodoListProps> = (props) => {
  const { tasks, updateTodo } = props;

  return (
    <ul className={styles.list}>
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
