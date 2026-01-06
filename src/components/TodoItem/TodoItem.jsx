import React, { useState } from 'react';
import './TodoItem.scss';
import Button from '../Button';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import EditIcon from '../../assets/icons/edit-icon.svg';
import { deleteTodo, editTodo } from '../../api/todoAPI';

const TodoItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { id, title, isDone, updateTasks } = props;

  const [checkedTask, setCheckedTask] = useState(isDone);
  const [isEdit, setIsEdit] = useState(false);
  const [editInputValue, setEditInputValue] = useState(title);
  const [editInputError, setEditInputError] = useState('');

  async function handledeleteTodo() {
    await deleteTodo(id);
    updateTasks();
  }

  async function handleCheckedTask() {
    setCheckedTask((prevState) => !prevState);
    await editTodo(id, title, !checkedTask);
    updateTasks();
  }

  function handleChange(event) {
    setEditInputValue(event.target.value);
    setEditInputError('');
  }

  async function handleSaveNewTitle() {
    if (editInputValue.trim().length === 0) {
      setEditInputError('Это поле не может быть пустым');
      return;
    }

    if (editInputValue.trim().length < 2) {
      setEditInputError('Минимальная длина текста 2 символа');
      return;
    }

    if (editInputValue.trim().length > 64) {
      setEditInputError('Максимальная длина текста 64 символа');
      return;
    }

    await editTodo(id, editInputValue, isDone);
    setIsEdit(false);
    updateTasks();
  }

  return isEdit ? (
    <li className={'todo__item item'}>
      {editInputError && (
        <span className={'item__edit-error'}>{editInputError}</span>
      )}
      <label className={'visually-hidden'} htmlFor={id}></label>
      <input
        className={`item__edit-field ${editInputError ? 'is-invalid' : ''}`}
        type="text"
        value={editInputValue}
        onChange={handleChange}
      />
      <Button
        className={'item__edit-button-save button'}
        onClick={handleSaveNewTitle}
      >
        Save
      </Button>
      <Button
        className={'item__edit-button-cancel button'}
        onClick={() => {
          setIsEdit(false);
          setEditInputValue(title);
        }}
      >
        Cancel
      </Button>
    </li>
  ) : (
    <li className={'todo__item item'}>
      <input
        className={'item__checkbox'}
        id={id}
        type="checkbox"
        checked={checkedTask}
        onChange={handleCheckedTask}
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
      <Button className={'item__button-delete'} onClick={handledeleteTodo}>
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
