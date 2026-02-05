import { Filters } from '../types/todoTypes.ts';

export function stringToFilters(value: string): value is Filters {
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
