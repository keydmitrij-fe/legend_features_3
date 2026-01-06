import React from 'react';
import './TodoInfo.scss';

const TodoInfo = (props) => {
  // eslint-disable-next-line react/prop-types
  const { info, status, setStatus } = props;

  return (
    <ul className={'todo__info info'}>
      <li
        className={`info__all ${status === 'all' ? 'active' : ''}`}
        onClick={() => {
          setStatus('all');
        }}
      >
        {/* eslint-disable-next-line react/prop-types */}
        Все ({info.all})
      </li>
      <li
        className={`info__in-work ${status === 'inWork' ? 'active' : ''}`}
        onClick={() => {
          setStatus('inWork');
        }}
      >
        {/* eslint-disable-next-line react/prop-types */}
        {}В работе ({info.inWork})
      </li>
      <li
        className={`info__completed ${status === 'completed' ? 'active' : ''}`}
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
