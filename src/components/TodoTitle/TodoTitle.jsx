import React, { useRef } from 'react';
import './TodoTitle.scss';
import Button from '../../ui/Button';
import { addTodo } from '../../api/todoAPI';

const TodoTitle = (props) => {
  // eslint-disable-next-line react/prop-types
  const { updateTodo, validationInput, error } = props;

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
    <form className={'todo__field field'} onSubmit={handleSubmit}>
      {error && <span className={'field__error'}>{error}</span>}
      <input
        className={`todo__field-input field-input  ${error ? 'is-invalid' : ''}`}
        type="text"
        autoComplete={'off'}
        placeholder={'Task To Be Done...'}
        ref={titleRef}
      />
      <Button className={'todo__field-button field-button'} type={'submit'}>
        Add
      </Button>
    </form>
  );
};

export default TodoTitle;
