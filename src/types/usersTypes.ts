export type Roles = 'ADMIN' | 'MODERATOR' | 'USER';

export interface User {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Roles[];
  phoneNumber: string;
}
