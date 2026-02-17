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
import { TodoRequest } from '../../types/todoTypes.ts';
import { VALIDATION_RULES } from '../../constants/validationRules.ts';

interface TodoItemProps {
  id: number;
  title: string;
  isDone: boolean;
  updateTodo: () => Promise<void>;
}

const TodoItem: FC<TodoItemProps> = (props) => {
  const { id, title, isDone, updateTodo } = props;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEditTodo: FormProps['onFinish'] = async (values: TodoRequest) => {
    try {
      await editTodo(id, { title: values.title });
      await updateTodo();

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
      await updateTodo();
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
      await updateTodo();
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
              { required: true, message: VALIDATION_RULES.REQUIRED_MESSAGE },
              { whitespace: true, message: VALIDATION_RULES.REQUIRED_MESSAGE },
              {
                min: VALIDATION_RULES.TITLE.MIN_LENGTH,
                message: VALIDATION_RULES.TITLE.MIN_MESSAGE,
              },
              {
                max: VALIDATION_RULES.TITLE.MAX_LENGTH,
                message: VALIDATION_RULES.TITLE.MAX_MESSAGE,
              },
            ]}
          >
            <Input variant={'outlined'} size={'large'} style={{ width: 500 }} />
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
          <Checkbox checked={isDone} onChange={handleToggleCheckboxTodo}>
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
  );
};

export default TodoItem;
