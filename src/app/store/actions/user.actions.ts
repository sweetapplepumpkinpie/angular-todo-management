import { createAction, props } from '@ngrx/store';

import { ICredentials, INewUser } from './../../models/user';

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
