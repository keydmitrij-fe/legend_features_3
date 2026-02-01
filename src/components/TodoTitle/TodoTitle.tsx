import { Button, Form, FormProps, Input } from 'antd';
import { addTodo } from '../../api/todoAPI.ts';
import { FC } from 'react';
import { Todo } from '../../types/todoTypes.ts';

type TodoTitleProps = {
  updateTodo: () => Promise<void>;
};

const TodoTitle: FC<TodoTitleProps> = (props) => {
  const { updateTodo } = props;

  const onFinish: FormProps['onFinish'] = async (values: Todo) => {
    if (values.title) {
      try {
        await addTodo(values.title);
        await updateTodo();
      } catch (e) {
        alert(e);
      }
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      layout={'inline'}
      size={'large'}
    >
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
          style={{
            width: 280,
            height: 50,
            fontWeight: 600,
          }}
          placeholder={'Task To Be Done...'}
          variant={'underlined'}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: 145, height: 50, fontWeight: 600 }}
        >
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TodoTitle;
