import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUser from './../reducers/user.reducers';

export const selectUserState = createFeatureSelector<fromUser.IUserState>(
  fromUser.userFeatureKey
);
console.log(selectUserState, fromUser.userFeatureKey);
export const getErrors = createSelector(
  selectUserState,
  (user: fromUser.IUserState) => user.error
);
export const isLoading = createSelector(
  selectUserState,
  (user: fromUser.IUserState) => user.isLoading
);
