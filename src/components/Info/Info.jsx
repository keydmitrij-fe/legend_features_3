import React from 'react';
import './Info.scss';

const Info = (props) => {
  // eslint-disable-next-line react/prop-types
  const { tasksAmount, onFilterTask, activeStatus, setActiveStatus } = props;

  return (
    <ul className={'todo__info info'}>
      <li
        className={`info__all ${activeStatus === 'all' ? 'active' : ''}`}
        onClick={() => {
          setActiveStatus('all');
          onFilterTask('all');
        }}
      >
        {/* eslint-disable-next-line react/prop-types */}
        Все ({tasksAmount.all})
      </li>
      <li
        className={`info__in-work ${activeStatus === 'inWork' ? 'active' : ''}`}
        onClick={() => {
          setActiveStatus('inWork');
          onFilterTask('inWork');
        }}
      >
        {/* eslint-disable-next-line react/prop-types */}В работе (
        {tasksAmount.inWork})
      </li>
      <li
        className={`info__completed ${activeStatus === 'completed' ? 'active' : ''}`}
        onClick={() => {
          setActiveStatus('completed');
          onFilterTask('completed');
        }}
      >
        {/* eslint-disable-next-line react/prop-types */}
        Сделано ({tasksAmount.completed})
      </li>
    </ul>
  );
};

export default Info;
