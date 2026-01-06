import React, { useRef, useState } from 'react';
import './Field.scss';
import Button from '../Button/index.jsx';
import { addTodo } from '../../api/todoAPI';

const Field = (props) => {
  // eslint-disable-next-line react/prop-types
  const { updateTasks } = props;

  const [fieldValue, setFieldValue] = useState('');
  const [fieldError, setFieldError] = useState('');

  const fieldRef = useRef();

  function handleChange(event) {
    setFieldValue(event.target.value);
    setFieldError('');
  }

  async function handleaddTodo() {
    if (fieldValue.trim().length === 0) {
      setFieldError('Это поле не может быть пустым');
      return;
    }

    if (fieldValue.trim().length < 2) {
      setFieldError('Минимальная длина текста 2 символа');
      return;
    }

    if (fieldValue.trim().length > 64) {
      setFieldError('Максимальная длина текста 64 символа');
      return;
    }

    await addTodo(fieldValue);
    updateTasks();
    setFieldValue('');
    fieldRef.current.focus();
  }

  return (
    <form className={'todo__field field'}>
      {fieldError && <span className={'field__error'}>{fieldError}</span>}
      <label className={'visually-hidden'} htmlFor="field"></label>
      <input
        className={`todo__field-input field-input  ${fieldError ? 'is-invalid' : ''}`}
        id={'field'}
        type="text"
        autoComplete={'off'}
        placeholder={'Task To Be Done...'}
        value={fieldValue}
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

export default Field;
