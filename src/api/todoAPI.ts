import type {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoStatus,
} from '../types/todoTypes.ts';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://easydev.club/api/v1',
});

export const getTodos = async (
  status: TodoStatus,
): Promise<MetaResponse<Todo, TodoInfo>> => {
  const response = await instance.get(`/todos?filter=${status}`);

  return response.data;
};

export async function addTodo(title: string) {
  await instance.post('/todos', { isDone: false, title });
}

export async function deleteTodo(id: number) {
  await instance.delete(`/todos/${id}`);
}

export async function editTodo(id: number, editedTodo: Todo): Promise<void> {
  await instance.put(`todos/${id}`, editedTodo);
}
