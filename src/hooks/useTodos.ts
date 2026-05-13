import useSWR from 'swr';
import { getTodos } from '../services/todoServices';
import { TodoInfoFilter } from '../types/todoTypes';

export function useTodos(filter: TodoInfoFilter) {
  const fetcher = getTodos.bind(null, filter);
  const { data, error, isLoading } = useSWR(`/todos`, fetcher);

  return {
    todos: data,
    isLoading,
    isError: error,
  };
}
