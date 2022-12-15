import { isSuccess } from './../selectors/user.selectors';
import { ITodo } from './../../models/todo';
import { createReducer, on } from '@ngrx/store';

import { IUser, INewUser } from './../../models/user';
import * as fromActions from '../actions/user.actions';

export const userFeatureKey = 'user';
export interface IUserState extends IUser {
  isLoading: boolean;
  success: boolean;
  todo: ITodo;
  todos: ITodo[];
  isTodoLoading: boolean;
  error: INewUser;
  todoError: string;
}
export const initialState: IUserState = {
  id: 0,
  email: '',
  name: '',
  todo: {},
  isLoading: false,
  success: false,
  isTodoLoading: false,
  error: {},
  todos: [],
  todoError: '',
};

export const userReducer = createReducer(
  initialState,
  on(fromActions.login, (state) => ({
    ...state,
    error: {},
    success: false,
    isLoading: true,
  })),
  on(fromActions.loginSuccess, (state, { token }) => {
    window.localStorage.setItem('token', token);
    return {
      ...state,
      success: true,
      isLoading: false,
    };
  }),
  on(fromActions.loginFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: { password: 'Email or password is incorrect.' },
  })),
  on(fromActions.register, (state) => ({
    ...state,
    error: {},
    isLoading: true,
  })),
  on(fromActions.registerSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(fromActions.registerFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(fromActions.getTodos, (state) => ({
    ...state,
    todoError: '',
    isTodoLoading: true,
  })),
  on(fromActions.getTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    isTodoLoading: false,
  })),
  on(fromActions.getTodosFail, (state, { error }) => ({
    ...state,
    isTodoLoading: false,
    error,
  })),
  on(fromActions.createTodo, (state) => ({
    ...state,
    todoError: '',
    success: false,
    isTodoLoading: true,
  })),
  on(fromActions.createTodoSuccess, (state) => ({
    ...state,
    success: true,
    isTodoLoading: false,
  })),
  on(fromActions.createTodoFail, (state, { error }) => ({
    ...state,
    success: false,
    isTodoLoading: false,
    error,
  })),
  on(fromActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
    isTodoLoading: false,
  })),
  on(fromActions.getTodo, (state) => ({
    ...state,
    isTodoLoading: true,
  })),
  on(fromActions.getTodoSuccess, (state, { todo }) => ({
    ...state,
    todo,
    isTodoLoading: false,
  })),
  on(fromActions.getTodoFail, (state) => ({
    ...state,
    isTodoLoading: false,
  }))
);
