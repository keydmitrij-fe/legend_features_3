import { FC, useState } from 'react';
import { deleteTodo, editTodo } from '../../api/todoAPI.ts';
import {
  Alert,
  Button,
  Checkbox,
  CheckboxProps,
  Form,
  FormProps,
  Input,
  List,
  Popconfirm,
  PopconfirmProps,
  Space,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
import { Todo } from '../../types/todoTypes.ts';
import { AxiosError, isAxiosError } from 'axios';

type TodoItemProps = {
  id?: number;
  title?: string;
  isDone?: boolean;
  updateTodo: () => Promise<void>;
};

const TodoItem: FC<TodoItemProps> = (props) => {
  const { id, title, isDone, updateTodo } = props;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | Error | null>(null);

  const handleEditTodo: FormProps['onFinish'] = async (values: Todo) => {
    const { title } = values;

    if (id) {
      try {
        await editTodo(id, {
          title: title,
          isDone: isDone,
        });
        await updateTodo();
      } catch (e) {
        if (isAxiosError(e) || e instanceof Error) {
          setError(e);
        }
      }
    }

    setIsEdit(false);
  };

  const handleToggleCheckbox: CheckboxProps['onChange'] = async (
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
        if (isAxiosError(e) || e instanceof Error) {
          setError(e);
        }
      }
    }
  };

  const handleDeleteTodo: PopconfirmProps['onConfirm'] = async () => {
    if (id) {
      try {
        await deleteTodo(id);
        await updateTodo();
      } catch (e) {
        if (isAxiosError(e) || e instanceof Error) {
          setError(e);
        }
      }
    }
  };

  return (
    <>
      {error && (
        <Alert
          title={error.name}
          description={error.message}
          type="error"
          showIcon
        />
      )}
      <List.Item key={id}>
        {isEdit ? (
          <Form onFinish={handleEditTodo} layout={'inline'}>
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
              <Input
                variant={'outlined'}
                size={'large'}
                style={{ width: 500 }}
              />
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
            <Checkbox checked={isDone} onChange={handleToggleCheckbox}>
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
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={handleDeleteTodo}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  icon={<DeleteOutlined />}
                  variant={'solid'}
                  color={'danger'}
                  size={'large'}
                />
              </Popconfirm>
            </Space>
          </>
        )}
      </List.Item>
    </>
  );
};

export default TodoItem;
