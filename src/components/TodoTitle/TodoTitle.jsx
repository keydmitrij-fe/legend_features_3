import React, { useRef } from 'react';
import { addTodo } from '../../api/todoAPI';
import Button from '../../ui/Button';
import styles from './TodoTitle.module.scss';

const TodoTitle = (props) => {
  // eslint-disable-next-line react/prop-types
  const { updateTodo, validationInput } = props;

  const titleRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();

    const title = titleRef.current.value.trim();

    if (validationInput(title)) {
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
      <input
        className={styles.input}
        type="text"
        autoComplete={'off'}
        placeholder={'Task To Be Done...'}
        ref={titleRef}
      />
      <Button
        variant={'primary'}
        className={styles.titleButton}
        type={'submit'}
      >
        Add
      </Button>
    </form>
  );
};

export default TodoTitle;
