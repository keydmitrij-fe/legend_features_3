import React from 'react';
import './TodoItem.scss';
import Button from '../Button/index.jsx';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import EditIcon from '../../assets/icons/edit-icon.svg';

const TodoItem = () => {
  return (
    <li className={'todo__item item'}>
      <input className={'item__checkbox'} id={'todo-1'} type="checkbox" />
      <label className={'item__label'} htmlFor={'todo-1'}>
        rewiew files
      </label>
      <Button className={'item__button-edit'}>
        <img
          src={EditIcon}
          alt=""
          width={20}
          height={20}
          aria-label={'Edit task'}
          title={'Edit task'}
        />
      </Button>
      <Button className={'item__button-delete'}>
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
