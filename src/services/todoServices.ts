import { AxiosResponse } from 'axios';
import {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoInfoFilter,
  TodoRequest,
} from '../types/todoTypes.ts';
import { api } from '../api/http.ts';

export const getTodos = async (
  filter: TodoInfoFilter,
): Promise<AxiosResponse<MetaResponse<Todo, TodoInfo>>> => {
  return await api.get('/todos', {
    params: {
      filter,
    },
  });
};

export const addTodo = async (title: string) => {
  await api.post('/todos', { isDone: false, title });
};

export const editTodo = async (id: number, editedTodo: TodoRequest) => {
  await api.put(`todos/${id}`, editedTodo);
};

export const deleteTodo = async (id: number) => {
  await api.delete(`/todos/${id}`);
};
