import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { ITodo } from './../../models/todo';
import {
  createTodo,
  getTodo,
  updateTodo,
} from './../../store/actions/user.actions';
import { FormBuilder, Validators } from '@angular/forms';
import { IUserState } from 'src/app/store/reducers/user.reducers';
import * as fromSelectors from '../../store/selectors/user.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent implements OnInit {
  success$: Observable<boolean | undefined>;
  todo$: Observable<ITodo>;
  checkoutForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
  });
  isNew: boolean;
  todo: ITodo;
  id: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<IUserState>
  ) {
    this.isNew = false;
    this.todo = {};
    this.success$ = this.store.pipe(select(fromSelectors.isSuccess));
    this.todo$ = this.store.pipe(select(fromSelectors.getTodo));
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id') || '';
    if (id === 'create' || id === '') {
      this.isNew = true;
    } else {
      this.id = +id;
      this.store.dispatch(getTodo({ id: +id }));
    }

    this.todo$.subscribe((todo) => {
      if (todo) {
        this.checkoutForm.patchValue(todo);
      }
    });

    this.success$.subscribe((success) => {
      if (success) {
        this.checkoutForm.patchValue({
          title: '',
          content: '',
        });
        Object.values(this.checkoutForm.controls).forEach((control) => {
          if (control.invalid) {
            control.reset();
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      if (this.isNew) {
        this.store.dispatch(
          createTodo({ todo: this.checkoutForm.value as ITodo })
        );
      } else {
        this.store.dispatch(
          updateTodo({
            id: this.id as number,
            todo: this.checkoutForm.value as ITodo,
          })
        );
      }
    } else {
      Object.values(this.checkoutForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
