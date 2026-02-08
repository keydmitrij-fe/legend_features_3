import type {
  TodoStatus,
  MetaResponse,
  Todo,
  TodoFilter,
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

export async function addTodo(title?: string) {
  if (title) {
    await instance.post('/todos', { isDone: false, title });
  }
}

export async function deleteTodo(id: number) {
  await instance.delete(`/todos/${id}`);
}

export async function editTodo(id: number, editedTodo: Todo): Promise<void> {
  await instance.put(`todos/${id}`, editedTodo);
}
