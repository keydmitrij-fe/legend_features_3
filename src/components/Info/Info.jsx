import React from 'react';
import './Info.scss';

const Info = () => {
  return (
    <ul className={'todo__info info'}>
      <li className={`info__all`}>Все ()</li>
      <li className={`info__in-work`}>В работе ()</li>
      <li className={`info__completed`}>Сделано ()</li>
    </ul>
  );
};

export default Info;
