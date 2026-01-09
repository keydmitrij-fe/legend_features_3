import React, { useRef, useState } from 'react';
import { addTodo } from '../../api/todoAPI';
import Button from '../../ui/Button';
import styles from './TodoTitle.module.scss';
import { validateTitle } from '../../helpers/validateTitle';

const TodoTitle = (props) => {
  // eslint-disable-next-line react/prop-types
  const { updateTodo } = props;

  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  const titleRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();

    const title = titleRef.current.value.trim();

    const { error, isValid } = validateTitle(title);

    setError(error);
    setIsValid(isValid);

    if (isValid) {
      try {
        await addTodo(title);
      } catch (e) {
        alert(e);
      }

      updateTodo();
      titleRef.current.value = '';
    }
  }

  return (
    <form className={styles.title} onSubmit={handleSubmit}>
      {!isValid && <span className={styles.error}>{error}</span>}
      <input
        className={`${styles.input} ${!isValid && styles.isInvalid}`}
        type="text"
        autoComplete={'off'}
        placeholder={'Task To Be Done...'}
        ref={titleRef}
      />
      <Button variant={'primary'} className={styles.button} type={'submit'}>
        Add
      </Button>
    </form>
  );
};

export default TodoTitle;
