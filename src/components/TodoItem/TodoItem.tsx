import { FC, useState } from 'react';
import { deleteTodo, editTodo } from '../../api/todoAPI.ts';
import {
  Button,
  Checkbox,
  CheckboxProps,
  Form,
  FormProps,
  Input,
  List,
  Space,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
import { Todo } from '../../types/todoTypes.ts';

type TodoItemProps = {
  id?: number;
  title?: string;
  isDone?: boolean;
  updateTodo: () => Promise<void>;
};

const TodoItem: FC<TodoItemProps> = (props) => {
  const { id, title, isDone, updateTodo } = props;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEdit: FormProps['onFinish'] = async (values: Todo) => {
    const { title } = values;

    if (id) {
      try {
        await editTodo(id, {
          title: title,
          isDone: isDone,
        });
        await updateTodo();
      } catch (e) {
        alert(e);
      }
    }

    setIsEdit(false);
  };

  const handleToggle: CheckboxProps['onChange'] = async (
    event: CheckboxChangeEvent,
  ) => {
    if (id) {
      try {
        await editTodo(id, {
          title: title,
          isDone: event.target.checked,
        });
        await updateTodo();
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteTodo(id);
        await updateTodo();
      } catch (e) {
        alert(e);
      }
    }
  };

  return (
    <List.Item key={id}>
      {isEdit ? (
        <Form layout={'inline'} onFinish={handleEdit}>
          <Form.Item
            initialValue={title}
            name={'title'}
            rules={[
              { required: true, message: 'Это поле не может быть пустым' },
              { whitespace: true, message: 'Это поле не может быть пустым' },
              { min: 2, message: 'Минимальная длина текста 2 символа' },
              { max: 64, message: 'Максимальная длина текста 64 символа' },
            ]}
          >
            <Input variant={'underlined'} size={'large'} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button
                variant={'solid'}
                color={'primary'}
                size={'large'}
                htmlType={'submit'}
              >
                Save
              </Button>
              <Button
                variant={'solid'}
                color={'danger'}
                size={'large'}
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      ) : (
        <>
          <Checkbox checked={isDone} onChange={handleToggle}>
            {title}
          </Checkbox>
          <Space>
            <Button
              icon={<EditOutlined />}
              variant={'solid'}
              color={'primary'}
              size={'large'}
              onClick={() => setIsEdit(true)}
            />
            <Button
              icon={<DeleteOutlined />}
              variant={'solid'}
              color={'danger'}
              size={'large'}
              onClick={handleDelete}
            />
          </Space>
        </>
      )}
    </List.Item>
  );
};

export default TodoItem;
