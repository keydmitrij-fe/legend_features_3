import styles from './TodoInfo.module.scss';
import type { FC } from 'react';
import type { TodoInfo, TodoStatus } from '../../types/todoTypes.ts';

type TodoInfoProps = {
  info: TodoInfo;
  status: TodoStatus;
  setStatus: (status: TodoStatus) => void;
};

const TodoInfo: FC<TodoInfoProps> = (props) => {
  const { info, status, setStatus } = props;

  return (
    <ul className={styles.info}>
      <li
        className={status === 'all' ? `${styles.active}` : ''}
        onClick={() => {
          setStatus('all');
        }}
      >
        Все ({info.all})
      </li>
      <li
        className={status === 'inWork' ? `${styles.active}` : ''}
        onClick={() => {
          setStatus('inWork');
        }}
      >
        В работе ({info.inWork})
      </li>
      <li
        className={status === 'completed' ? `${styles.active}` : ''}
        onClick={() => {
          setStatus('completed');
        }}
      >
        Сделано ({info.completed})
      </li>
    </ul>
  );
};

export default TodoInfo;
