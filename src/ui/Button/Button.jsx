import React from 'react';
import styles from './Button.module.scss';

const Button = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    variant,
    // eslint-disable-next-line react/prop-types
    className = '',
    // eslint-disable-next-line react/prop-types
    type = 'button',
    // eslint-disable-next-line react/prop-types
    children,
    ...rest
  } = props;

  return (
    <button
      className={`${styles.button} ${variant === 'primary' ? styles.primary : styles.secondary} ${className} `}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
