import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from './../../auth.service';
import * as fromActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
  login = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.login),
      switchMap((action) => {
        return this.authService.login(action.credentials).pipe(
          map((user: any) => fromActions.loginSuccess(user)),
          catchError((error) => of(fromActions.loginFail({ error })))
        );
      })
    )
  );

  register = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.register),
      switchMap((action) => {
        return this.authService.register(action.user).pipe(
          map(() => fromActions.registerSuccess()),
          catchError((error) => of(fromActions.registerFail({ error })))
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
