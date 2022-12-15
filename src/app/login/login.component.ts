import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { IUserState } from './../store/reducers/user.reducers';
import { login } from '../store/actions/user.actions';
import { BaseComponent } from 'src/core/base.component';
import * as fromSelectors from './../store/selectors/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  checkoutForm = this.formbuilder.group({
    email: '',
    password: '',
  });

  isLoading$: Observable<boolean> = this.store.pipe(
    select(fromSelectors.isLoading)
  );

  constructor(
    private formbuilder: FormBuilder,
    private store: Store<IUserState>
  ) {
    super();
  }

  onSubmit(): void {
    this.store.dispatch(login({ credentials: this.checkoutForm.value }));
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromSelectors.isLoading);
  }
}
