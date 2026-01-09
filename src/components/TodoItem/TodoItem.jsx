import React, { useState } from 'react';
import Button from '../../ui/Button';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import EditIcon from '../../assets/icons/edit-icon.svg';
import { deleteTodo, editTodo } from '../../api/todoAPI';
import styles from './TodoItem.module.scss';

const TodoItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { id, title, isDone, updateTodo, validationInput } = props;

  const [checkedTodo, setCheckedTodo] = useState(isDone);
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  async function handleDeleteTodo() {
    try {
      await deleteTodo(id);
    } catch (e) {
      alert(e);
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

  function handleChange(event) {
    setEditTitle(event.target.value);
  }

  async function handleSaveNewTitle() {
    const title = editTitle.trim();

    if (validationInput(title)) {
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
      {isEdit ? (
        <>
          <input
            className={styles.editTitle}
            type="text"
            value={editTitle}
            onChange={handleChange}
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
