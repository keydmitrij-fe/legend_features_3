import React from 'react';
import './Field.scss';
import Button from '../Button/index.jsx';

const Field = () => {
  return (
    <form className={'todo__field field'}>
      <label className={'visually-hidden'} htmlFor="field"></label>
      <input
        className={'todo__field-input field-input'}
        id={'field'}
        type="text"
        autoComplete={'off'}
        placeholder={'Task To Be Done...'}
      />
      <Button className={'todo__field-button field-button'}>Add</Button>
    </form>
  );
};

export default Field;
