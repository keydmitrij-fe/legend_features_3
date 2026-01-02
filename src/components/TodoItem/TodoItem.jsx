import React, { useState } from 'react';
import './TodoItem.scss';
import Button from '../Button';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import EditIcon from '../../assets/icons/edit-icon.svg';

const TodoItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { id, title, isDone, updateTask, deleteTask } = props;

  const [editTitle, setEditTitle] = useState(title);
  const [isEdit, setIsEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(isDone);
  const [editTitleError, setEditTitleError] = useState('');

  const handleCheckboxChange = () => {
    setIsChecked((prevState) => {
      updateTask(id, title, !prevState);
      return !isChecked;
    });
  };

  const handleChange = (event) => {
    setEditTitleError('');
    setEditTitle(event.target.value);
  };

  const validationEditValue = () => {
    if (editTitle.trim().length === 0) {
      setEditTitleError('Это поле не может быть пустым');
      return;
    }

    if (editTitle.trim().length === 1) {
      setEditTitleError('Минимальная длина текста 2 символа');
      return;
    }

    if (editTitle.trim().length > 64) {
      setEditTitleError('Максимальная длина текста 64 символа');
      return;
    }

    updateTask(id, editTitle, isDone);
    setIsEdit(false);
  };

  return isEdit ? (
    <li className={'item'}>
      <input
        className={`item__edit-field ${editTitleError ? 'is-invalid' : ''}`}
        type="text"
        value={editTitle}
        onChange={handleChange}
      />
      {editTitleError && (
        <span className={'item__edit-error'}>{editTitleError}</span>
      )}
      <button
        className={'item__edit-button-save button'}
        type="button"
        onClick={validationEditValue}
      >
        Save
      </button>
      <button
        className={'item__edit-button-cancel button'}
        type="button"
        onClick={() => setIsEdit(false)}
      >
        Cancel
      </button>
    </li>
  ) : (
    <li className={'todo__item item'}>
      <input
        className={'item__checkbox'}
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          handleCheckboxChange();
        }}
      />
      <label className={'item__label'} htmlFor={id}>
        {title}
      </label>
      <Button className={'item__button-edit'} onClick={() => setIsEdit(true)}>
        <img
          src={EditIcon}
          alt=""
          width={20}
          height={20}
          aria-label={'Edit task'}
          title={'Edit task'}
        />
      </Button>
      <Button className={'item__button-delete'} onClick={() => deleteTask(id)}>
        <img
          src={DeleteIcon}
          alt=""
          width={20}
          height={20}
          aria-label={'Delete task'}
          title={'Delete task'}
        />
      </Button>
    </li>
  );
};

export default TodoItem;
