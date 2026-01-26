import styles from './Button.module.scss';
import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
}

const Button: FC<ButtonProps> = (props) => {
  const { variant, className = '', type = 'button', children, ...rest } = props;

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
