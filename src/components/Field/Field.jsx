import React, { useRef, useState } from 'react';
import './Field.scss';
import Button from '../Button/index.jsx';

const Field = (props) => {
  // eslint-disable-next-line react/prop-types
  const { addTask } = props;

  const [fieldValue, setFieldValue] = useState('');
  const [fieldError, setFieldError] = useState('');

  const fieldRef = useRef();

  const handleChange = (event) => {
    setFieldError('');
    const title = event.target.value;

    setFieldValue(title);
  };

  const validationField = (title) => {
    if (title.trim().length === 0) {
      setFieldError('Это поле не может быть пустым');
      return;
    }

    if (title.trim().length === 1) {
      setFieldError('Минимальная длина текста 2 символа');
      return;
    }

    if (title.trim().length > 64) {
      setFieldError('Максимальная длина текста 64 символа');
      return;
    }

    setFieldError('');
    addTask(fieldValue);
    setFieldValue('');
    fieldRef.current.focus();
  };

  return (
    <form className={'todo__field field'}>
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
      {fieldError && <span className="field__error">{fieldError}</span>}
      <Button
        className={'todo__field-button field-button'}
        onClick={() => validationField(fieldValue)}
      >
        Add
      </Button>
    </form>
  );
};

export default Field;
