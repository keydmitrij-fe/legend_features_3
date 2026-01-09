import React from 'react';
import styles from './TodoInfo.module.scss';

const TodoInfo = (props) => {
  // eslint-disable-next-line react/prop-types
  const { info, status, setStatus } = props;

  return (
    <ul className={styles.info}>
      <li
        className={status === 'all' ? `${styles.active}` : ''}
        onClick={() => {
          setStatus('all');
        }}
      >
        {/* eslint-disable-next-line react/prop-types */}
        Все ({info.all})
      </li>
      <li
        className={status === 'inWork' ? `${styles.active}` : ''}
        onClick={() => {
          setStatus('inWork');
        }}
      >
        {/* eslint-disable-next-line react/prop-types */}
        {}В работе ({info.inWork})
      </li>
      <li
        className={status === 'completed' ? `${styles.active}` : ''}
        onClick={() => {
          setStatus('completed');
        }}
      >
        {/* eslint-disable-next-line react/prop-types */}
        Сделано ({info.completed})
      </li>
    </ul>
  );
};

export default TodoInfo;
