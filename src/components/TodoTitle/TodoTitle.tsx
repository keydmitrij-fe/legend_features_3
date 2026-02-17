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
import { FC } from 'react';
import { Todo } from '../../types/todoTypes.ts';
import { VALIDATION_RULES } from '../../constants/validationRules.ts';

type TodoTitleProps = {
  updateTodo: () => Promise<void>;
};

const TodoTitle: FC<TodoTitleProps> = (props) => {
  const { updateTodo } = props;

  const onFinish: FormProps['onFinish'] = async (
    values: Pick<Todo, 'title'>,
  ) => {
    try {
      await addTodo(values.title);
      await updateTodo();
    } catch (e) {
      console.error(e);
      notification.error({
        title: 'Ошибка!',
        description: 'Ошибка при добавлении задачи',
      });
    }
  };

  return (
    <Flex justify={'center'}>
      <Form onFinish={onFinish} autoComplete="off">
        <Space.Compact>
          <Form.Item
            name="title"
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
            <Input
              placeholder={'Задача, которую нужно выполнить...'}
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
  );
};

export default TodoTitle;
