import React, { useState } from 'react';
import Button from '../../ui/Button';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import EditIcon from '../../assets/icons/edit-icon.svg';
import { deleteTodo, editTodo } from '../../api/todoAPI';
import styles from './TodoItem.module.scss';
import { validateTitle } from '../../helpers/validateTitle';

const TodoItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { id, title, isDone, updateTodo } = props;

  const [checkedTodo, setCheckedTodo] = useState(isDone);
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  async function handleDeleteTodo() {
    if (confirm('Удалить задачу?')) {
      try {
        await deleteTodo(id);
      } catch (e) {
        alert(e);
      }
    }
    updateTodo();
  }

  async function handleCheckedTodo() {
    setCheckedTodo((prevState) => !prevState);

    try {
      await editTodo(id, { title, isDone: !checkedTodo });
    } catch (e) {
      alert(e);
    }

    updateTodo();
  }

  async function handleSaveNewTitle() {
    const title = editTitle.trim();

    const { error, isValid } = validateTitle(title);

    setError(error);
    setIsValid(isValid);

    if (isValid) {
      try {
        await editTodo(id, { title, isDone });
      } catch (e) {
        alert(e);
      }

      setIsEdit(false);
      updateTodo();
    }
  }

  function handleCancelNewTitle() {
    setIsEdit(false);
    setEditTitle(title);
  }

  return (
    <li className={styles.item}>
      {!isValid && <span className={styles.error}>{error}</span>}
      {isEdit ? (
        <>
          <input
            className={`${styles.editTitle} ${!isValid && styles.isInvalid}`}
            type="text"
            value={editTitle}
            onChange={(event) => {
              setEditTitle(event.target.value);
            }}
          />
          <Button
            variant={'primary'}
            className={styles.editButtonSave}
            onClick={handleSaveNewTitle}
          >
            Save
          </Button>
          <Button
            variant={'secondary'}
            className={styles.editButtonCancel}
            onClick={handleCancelNewTitle}
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <input
            className={styles.checkbox}
            id={id}
            type="checkbox"
            checked={checkedTodo}
            onChange={handleCheckedTodo}
          />
          <label className={styles.label} htmlFor={id}>
            {title}
          </label>
          <Button
            variant={'primary'}
            className={styles.editButton}
            onClick={() => setIsEdit(true)}
          >
            <img
              src={EditIcon}
              alt=""
              width={20}
              height={20}
              aria-label={'Edit task'}
              title={'Edit task'}
            />
          </Button>
          <Button
            variant={'secondary'}
            className={styles.deleteButton}
            onClick={handleDeleteTodo}
          >
            <img
              src={DeleteIcon}
              alt=""
              width={20}
              height={20}
              aria-label={'Delete task'}
              title={'Delete task'}
            />
          </Button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
