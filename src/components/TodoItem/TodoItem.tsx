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
  notification,
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

  const TITLE_RULES = {
    MIN_LENGTH: 2,
    MAX_LENGTH: 64,
    REQUIRED_MESSAGE: 'Это поле не может быть пустым',
    MIN_MESSAGE: 'Минимальная длина текста 2 символа',
    MAX_MESSAGE: 'Максимальная длина текста 64 символа',
  };

  const handleEditTodo: FormProps['onFinish'] = async (values: Todo) => {
    const { title } = values;

    if (id) {
      try {
        await editTodo(id, {
          title: title,
          isDone: isDone,
        });
        await updateTodo();

        setIsEdit(false);
        setError(null);
      } catch (e) {
        if (isAxiosError(e) || e instanceof Error) {
          setError(e);
        }
      }
    }
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
        setError(null);
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
        setError(null);
      } catch (e) {
        if (isAxiosError(e) || e instanceof Error) {
          setError(e);
        }
      }
    }
  };

  return (
    <>
      {error &&
        notification.error({
          title: error.name,
          description: error.message,
          duration: 5,
        })}
      <List.Item key={id}>
        {isEdit ? (
          <Form onFinish={handleEditTodo} layout={'inline'}>
            <Form.Item
              initialValue={title}
              name={'title'}
              rules={[
                { required: true, message: TITLE_RULES.REQUIRED_MESSAGE },
                { whitespace: true, message: TITLE_RULES.REQUIRED_MESSAGE },
                {
                  min: TITLE_RULES.MIN_LENGTH,
                  message: TITLE_RULES.MIN_MESSAGE,
                },
                {
                  max: TITLE_RULES.MAX_LENGTH,
                  message: TITLE_RULES.MAX_MESSAGE,
                },
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
                  Сохранить
                </Button>
                <Button
                  variant={'outlined'}
                  color={'primary'}
                  size={'large'}
                  onClick={() => setIsEdit(false)}
                >
                  Отмена
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
                title="Удаление задачи"
                description="Ты точно хочешь удалить эту задачу?"
                onConfirm={handleDeleteTodo}
                okText="Да"
                cancelText="Нет"
              >
                <Button
                  icon={<DeleteOutlined />}
                  variant="outlined"
                  color="primary"
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
