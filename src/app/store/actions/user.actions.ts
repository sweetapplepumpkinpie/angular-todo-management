import { ITodo } from './../../models/todo';
import { createAction, props } from '@ngrx/store';

import { ICredentials, INewUser, IUser } from './../../models/user';

export const verify = createAction('[User] Verify');

export const verifySuccess = createAction(
  '[User] Verify success',
  props<{ user: IUser | undefined }>()
);

export const verifyFail = createAction('[User] Verify fail');

export const login = createAction(
  '[User] Login',
  props<{ credentials: Partial<ICredentials> }>()
);

export const loginSuccess = createAction(
  '[User] Login success',
  props<{ token: string }>()
);

export const loginFail = createAction(
  '[User] Login failure',
  props<{ error: any }>()
);

export const register = createAction(
  '[User] Register',
  props<{ user: Partial<INewUser> }>()
);

export const registerSuccess = createAction('[User] Register success');

export const registerFail = createAction(
  '[User] Register failure',
  props<{ error: any }>()
);

export const getTodos = createAction('[User] Get Todos');

export const getTodosSuccess = createAction(
  '[User] Get Todos success',
  props<{ todos: any }>()
);

export const getTodosFail = createAction(
  '[User] Get Todos failure',
  props<{ error: any }>()
);

export const createTodo = createAction(
  '[User] Create Todo',
  props<{ todo: Partial<ITodo> }>()
);

export const createTodoSuccess = createAction('[User] Create Todo success');

export const createTodoFail = createAction(
  '[User] Create Todo failure',
  props<{ error: any }>()
);

export const deleteTodo = createAction(
  '[User] Delete Todo',
  props<{ id: number }>()
);
export const deleteTodoSuccess = createAction(
  '[User] Delete Todo success',
  props<{ id: number }>()
);
export const deleteTodoFail = createAction('[User] Delete Todo fail');
export const getTodo = createAction('[User] Get Todo', props<{ id: number }>());
export const getTodoSuccess = createAction(
  '[User] Get Todo success',
  props<{ todo: ITodo }>()
);
export const getTodoFail = createAction('[User] Get Todo fail');
export const updateTodo = createAction(
  '[User] Update Todo',
  props<{ id: number; todo: ITodo }>()
);
export const updateTodoSuccess = createAction(
  '[User] Update Todo success',
  props<{ todo: ITodo }>()
);
export const updateTodoFail = createAction('[User] Update Todo fail');
export const logout = createAction('[User] Logout');
