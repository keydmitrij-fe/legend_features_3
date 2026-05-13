import { FC, useState } from 'react';
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
import { TodoRequest } from '../../types/todoTypes.ts';
import { deleteTodo, editTodo } from '../../services/todoServices.ts';
import {
  VALIDATION_INPUTS_MESSAGE,
  VALIDATION_INPUTS_RULES,
} from '../../constants/validationRules.ts';
import { useSWRConfig } from 'swr';

interface TodoItemProps {
  id: number;
  title: string;
  isDone: boolean;
}

const TodoItem: FC<TodoItemProps> = (props) => {
  const { id, title, isDone } = props;
  const { mutate } = useSWRConfig();

  const invalidateTodos = () =>
    mutate((key) => Array.isArray(key) && key[0] === '/todos');

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEditTodo: FormProps['onFinish'] = async (values: TodoRequest) => {
    try {
      await editTodo(id, { title: values.title });
      invalidateTodos();
      setIsEdit(false);
    } catch (e) {
      console.error(e);
      notification.error({
        title: 'Ошибка!',
        description: 'Ошибка при редактировании задачи',
      });
    }
  };

  const handleToggleCheckboxTodo: CheckboxProps['onChange'] = async (
    event: CheckboxChangeEvent,
  ) => {
    try {
      await editTodo(id, { isDone: event.target.checked });
      invalidateTodos();
    } catch (e) {
      console.error(e);
      notification.error({
        title: 'Ошибка!',
        description: 'Ошибка при редактировании задачи',
      });
    }
  };

  const handleDeleteTodo: PopconfirmProps['onConfirm'] = async () => {
    try {
      await deleteTodo(id);
      invalidateTodos();
    } catch (e) {
      console.error(e);
      notification.error({
        title: 'Ошибка!',
        description: 'Ошибка при удалении задачи',
      });
    }
  };

  return (
    <List.Item key={id}>
      {isEdit ? (
        <Form onFinish={handleEditTodo} layout={'inline'}>
          <Form.Item
            initialValue={title}
            name={'title'}
            rules={[
              { required: true, message: VALIDATION_INPUTS_MESSAGE.REQUIRED },
              { whitespace: true, message: VALIDATION_INPUTS_MESSAGE.REQUIRED },
              {
                min: VALIDATION_INPUTS_RULES.TITLE.MIN_LENGTH,
                message: VALIDATION_INPUTS_MESSAGE.TITLE.MIN_LENGTH,
              },
              {
                max: VALIDATION_INPUTS_RULES.TITLE.MAX_LENGTH,
                message: VALIDATION_INPUTS_MESSAGE.TITLE.MAX_LENGTH,
              },
            ]}
          >
            <Input
              variant={'outlined'}
              size={'large'}
              style={{ width: 500, marginLeft: 20 }}
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
          <Checkbox
            checked={isDone}
            onChange={handleToggleCheckboxTodo}
            style={{ marginLeft: 20 }}
          >
            {title}
          </Checkbox>
          <Space style={{ marginRight: 20 }}>
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
  );
};

export default TodoItem;
