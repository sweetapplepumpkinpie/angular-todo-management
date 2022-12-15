import { IUser } from './user';

export interface ITodo {
  content?: string;
  id?: number;
  title?: string;
  user?: IUser;
}
