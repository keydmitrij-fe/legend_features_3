import React from 'react';
import './Button.scss';

const Button = (props) => {
  // eslint-disable-next-line react/prop-types
  const { className = '', type = 'button', children } = props;

  return (
    <button className={`button ${className}`} type={type}>
      {children}
    </button>
  );
};

export default Button;
