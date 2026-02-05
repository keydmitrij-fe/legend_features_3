import { Alert, Button, Flex, Form, FormProps, Input, Space } from 'antd';
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
    if (values.title) {
      try {
        await addTodo(values.title);
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
                { required: true, message: 'Это поле не может быть пустым' },
                { whitespace: true, message: 'Это поле не может быть пустым' },
                { min: 2, message: 'Минимальная длина текста 2 символа' },
                { max: 64, message: 'Максимальная длина текста 64 символа' },
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
                Add
              </Button>
            </Form.Item>
          </Space.Compact>
        </Form>
      </Flex>
    </>
  );
};

export default TodoTitle;
