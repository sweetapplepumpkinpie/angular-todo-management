import { createReducer, on } from '@ngrx/store';

import { IUser, INewUser } from './../../models/user';
import * as fromActions from '../actions/user.actions';

export const userFeatureKey = 'user';
export interface IUserState extends IUser {
  isLoading: boolean;
  error: INewUser;
}
export const initialState: IUserState = {
  id: 0,
  email: '',
  name: '',
  isLoading: false,
  error: {},
};

export const userReducer = createReducer(
  initialState,
  on(fromActions.login, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(fromActions.loginSuccess, (state, { token }) => {
    window.localStorage.setItem('token', token);
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(fromActions.loginFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(fromActions.register, (state) => ({
    ...state,
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
  }))
);
