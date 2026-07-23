// core/models/user.ts

export interface User {
  id: string;
  name: string;
  password: string;
  role: 'User' | 'Admin' | 'SuperAdmin';
}
