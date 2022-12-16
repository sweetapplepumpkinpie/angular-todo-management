import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUser from './../reducers/user.reducers';

export const selectUserState = createFeatureSelector<fromUser.IUserState>(
  fromUser.userFeatureKey
);
export const getErrors = createSelector(
  selectUserState,
  (user: fromUser.IUserState) => user.error
);
export const isLoading = createSelector(
  selectUserState,
  (user: fromUser.IUserState) => user.isLoading
);
export const isSuccess = createSelector(
  selectUserState,
  (user: fromUser.IUserState) => user.success
);
export const getTodos = createSelector(
  selectUserState,
  (user: fromUser.IUserState) => user.todos
);
export const getTodo = createSelector(
  selectUserState,
  (user: fromUser.IUserState) => user.todo
);
export const getMe = createSelector(
  selectUserState,
  (user: fromUser.IUserState) => user.user
);
export const getLoginSuccess = createSelector(
  selectUserState,
  (user: fromUser.IUserState) => user.loginSuccess
);
