export type TodoStatus = 'all' | 'completed' | 'inWork';

export type Todo = {
  id?: number;
  title?: string;
  created?: string;
  isDone?: boolean;
};

export type TodoInfo = {
  all: number;
  completed: number;
  inWork: number;
};

export type MetaResponse<T, N> = {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
};
