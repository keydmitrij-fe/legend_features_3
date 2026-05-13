import useSWR from 'swr';
import { getTodos } from '../services/todoServices';
import { TodoInfoFilter } from '../types/todoTypes';

export function useTodos(filter: TodoInfoFilter) {
  const { data, error, isLoading, mutate } = useSWR(
    [`/todos`, filter],
    () => getTodos(filter),
    { refreshInterval: 5000 },
  );

  return {
    todos: data,
    isLoading,
    isError: error,
    mutate,
  };
}
