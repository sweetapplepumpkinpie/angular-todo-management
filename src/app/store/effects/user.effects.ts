import { ITodo } from './../../models/todo';
import { verify, getTodos, createTodo } from './../actions/user.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from './../../auth.service';
import * as fromActions from '../actions/user.actions';
import { TodoService } from 'src/app/todo.service';

@Injectable()
export class UserEffects {
  verify = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.verify),
      mergeMap((action) => {
        return this.authService.verify().pipe(
          map((user: any) => fromActions.verifySuccess(user)),
          catchError((error) => of(fromActions.verifyFail()))
        );
      })
    )
  );

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

  getTodos = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getTodos),
      mergeMap((action) => {
        return this.todoService.getTodos().pipe(
          map((todos: any) => fromActions.getTodosSuccess({ todos })),
          catchError((error) => of(fromActions.getTodosFail(error)))
        );
      })
    )
  );

  createTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createTodo),
      mergeMap((action) => {
        return this.todoService.createTodo(action.todo as ITodo).pipe(
          map(() => fromActions.createTodoSuccess()),
          catchError((error) => of(fromActions.createTodoFail(error)))
        );
      })
    )
  );

  deleteTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteTodo),
      mergeMap((action) => {
        return this.todoService.deleteTodo(action.id).pipe(
          map(() => fromActions.deleteTodoSuccess({ id: action.id })),
          catchError(() => of(fromActions.deleteTodoFail()))
        );
      })
    )
  );

  getTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getTodo),
      mergeMap((action) => {
        return this.todoService.getTodo(action.id).pipe(
          map((todo) => fromActions.getTodoSuccess({ todo })),
          catchError(() => of(fromActions.getTodoFail()))
        );
      })
    )
  );

  updateTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateTodo),
      mergeMap((action) => {
        return this.todoService.updateTodo(action.id, action.todo).pipe(
          map((todo) => fromActions.updateTodoSuccess({ todo })),
          catchError(() => of(fromActions.updateTodoFail()))
        );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private todoService: TodoService
  ) {}
}
