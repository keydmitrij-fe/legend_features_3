import { TodoStatus } from '../types/todoTypes.ts';

const Statuses: TodoStatus[] = ['all', 'completed', 'inWork'];

export function isTodoStatus(value: string): value is TodoStatus {
  return Statuses.includes(value as TodoStatus);
}
