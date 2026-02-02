import type {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoStatus,
} from '../types/todoTypes.ts';
import axios from 'axios';

const API = 'https://easydev.club/api/v1/todos';

export const getTodos = async (
  status: TodoStatus,
): Promise<MetaResponse<Todo, TodoInfo>> => {
  const response = await axios.get(`${API}?filter=${status}`);

  return response.data;
};

export async function addTodo(title: string) {
  await axios.post(API, { isDone: false, title });
}

export async function deleteTodo(id: number) {
  await axios.delete(`${API}/${id}`);
}

export async function editTodo(id: number, editedTodo: Todo): Promise<void> {
  await axios.put(`${API}/${id}`, editedTodo);
}
