import React, { useRef, useState } from 'react';
import './TodoTitle.scss';
import Button from '../Button/index.jsx';
import { addTodo } from '../../api/todoAPI';

const TodoTitle = (props) => {
  // eslint-disable-next-line react/prop-types
  const { updateTasks } = props;

  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const fieldRef = useRef();

  function handleChange(event) {
    setTitle(event.target.value);
    setError('');
  }

  async function handleaddTodo() {
    if (title.trim().length === 0) {
      setError('Это поле не может быть пустым');
      return;
    }

    if (title.trim().length < 2) {
      setError('Минимальная длина текста 2 символа');
      return;
    }

    if (title.trim().length > 64) {
      setError('Максимальная длина текста 64 символа');
      return;
    }

    await addTodo(title);
    updateTasks();
    setTitle('');
    fieldRef.current.focus();
  }

  return (
    <form className={'todo__field field'}>
      {error && <span className={'field__error'}>{error}</span>}
      <input
        className={`todo__field-input field-input  ${error ? 'is-invalid' : ''}`}
        type="text"
        autoComplete={'off'}
        placeholder={'Task To Be Done...'}
        value={title}
        onChange={handleChange}
        ref={fieldRef}
      />
      <Button
        className={'todo__field-button field-button'}
        onClick={handleaddTodo}
      >
        Add
      </Button>
    </form>
  );
};

export default TodoTitle;
