import React from 'react';
import './Info.scss';

const Info = (props) => {
  // eslint-disable-next-line react/prop-types
  const { info, status, setStatus } = props;

  async function handleClick(status) {
    switch (status) {
      case 'all':
        setStatus('all');
        break;
      case 'inWork':
        setStatus('inWork');
        break;
      case 'completed':
        setStatus('completed');
        break;
    }
  }

  return (
    <ul className={'todo__info info'}>
      <li
        className={`info__all ${status === 'all' ? 'active' : ''}`}
        onClick={() => {
          handleClick('all');
        }}
      >
        {/* eslint-disable-next-line react/prop-types */}
        Все ({info.all})
      </li>
      <li
        className={`info__in-work ${status === 'inWork' ? 'active' : ''}`}
        onClick={() => {
          handleClick('inWork');
        }}
      >
        {/* eslint-disable-next-line react/prop-types */}
        {}В работе ({info.inWork})
      </li>
      <li
        className={`info__completed ${status === 'completed' ? 'active' : ''}`}
        onClick={() => {
          handleClick('completed');
        }}
      >
        {/* eslint-disable-next-line react/prop-types */}
        Сделано ({info.completed})
      </li>
    </ul>
  );
};

export default Info;
