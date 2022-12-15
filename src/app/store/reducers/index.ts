import { ActionReducerMap } from '@ngrx/store';
import { userReducer, IUserState } from './user.reducers';

export interface AppState {
  user: IUserState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
};
