import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  notification,
  Space,
} from 'antd';
import { addTodo } from '../../api/todoAPI.ts';
import { FC, useState } from 'react';
import { Todo } from '../../types/todoTypes.ts';
import { AxiosError, isAxiosError } from 'axios';

type TodoTitleProps = {
  updateTodo: () => Promise<void>;
};

const TodoTitle: FC<TodoTitleProps> = (props) => {
  const { updateTodo } = props;

  const [error, setError] = useState<AxiosError | Error | null>(null);

  const handleAddTodo: FormProps['onFinish'] = async (values: Todo) => {
    try {
      await addTodo(values.title);
      await updateTodo();
      setError(null);
    } catch (e) {
      if (isAxiosError(e) || e instanceof Error) {
        setError(e);
      }
    }
  };

  const TITLE_RULES = {
    MIN_LENGTH: 2,
    MAX_LENGTH: 64,
    REQUIRED_MESSAGE: 'Это поле не может быть пустым',
    MIN_MESSAGE: 'Минимальная длина текста 2 символа',
    MAX_MESSAGE: 'Максимальная длина текста 64 символа',
  };

  return (
    <>
      {error &&
        notification.error({
          title: error.name,
          description: error.message,
          duration: 5,
        })}
      <Flex justify={'center'}>
        <Form
          initialValues={{ remember: true }}
          onFinish={handleAddTodo}
          autoComplete="off"
        >
          <Space.Compact>
            <Form.Item
              name="title"
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
                placeholder={'Task To Be Done...'}
                variant={'outlined'}
                size={'large'}
                style={{ width: 500 }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size={'large'}>
                Добавить
              </Button>
            </Form.Item>
          </Space.Compact>
        </Form>
      </Flex>
    </>
  );
};

export default TodoTitle;
