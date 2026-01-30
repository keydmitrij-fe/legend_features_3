import { TodoStatus } from '../types/todoTypes.ts';

export function stringToStatus(value: string): value is TodoStatus {
  switch (value) {
    case 'all':
    case 'inWork':
    case 'completed':
      return true;
    default: {
      return false;
    }
  }
}
