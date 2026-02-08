import type {
  MetaResponse,
  Todo,
  TodoFilter,
  TodoStatus,
} from '../types/todoTypes.ts';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://easydev.club/api/v1',
});

export const getTodos = async (
  filter: TodoStatus,
): Promise<MetaResponse<Todo, TodoFilter>> => {
  const response = await instance.get('/todos', {
    params: {
      filter,
    },
  });

  return response.data;
};

export const addTodo = async (title?: string) => {
  if (title) {
    await instance.post('/todos', { isDone: false, title });
  }
};

export const deleteTodo = async (id: number) => {
  await instance.delete(`/todos/${id}`);
};

export const editTodo = async (id: number, editedTodo: Todo) => {
  await instance.put(`todos/${id}`, editedTodo);
};
