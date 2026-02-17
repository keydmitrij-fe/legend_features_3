import { TodoInfoFilter } from '../types/todoTypes.ts';

const Statuses: TodoInfoFilter[] = ['all', 'completed', 'inWork'];

export function isTodoStatus(value: string): value is TodoInfoFilter {
  return Statuses.includes(value as TodoInfoFilter);
}
