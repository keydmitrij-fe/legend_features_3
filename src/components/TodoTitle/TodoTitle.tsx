import { type FC, type FormEvent, useRef, useState } from 'react';
import { addTodo } from '../../api/todoAPI.ts';
import Button from '../../ui/Button';
import styles from './TodoTitle.module.scss';
import { validateTitle } from '../../helpers/validateTitle';

type TodoTitleProps = {
  updateTodo: () => Promise<void>;
};

const TodoTitle: FC<TodoTitleProps> = (props) => {
  const { updateTodo } = props;

  const [error, setError] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const titleRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = titleRef.current?.value.trim();

    const { error, isValid } = validateTitle(title);

    setError(error);
    setIsValid(isValid);

    if (isValid && title) {
      try {
        await addTodo(title);
      } catch (e) {
        alert(e);
      }

      await updateTodo();

      if (titleRef.current) {
        titleRef.current.value = '';
      }
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
