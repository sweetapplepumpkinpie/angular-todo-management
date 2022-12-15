import { Router } from '@angular/router';
import { isSuccess } from './../../store/selectors/user.selectors';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { INewUser } from '../../models/user';
import { IUserState } from '../../store/reducers/user.reducers';
import { login } from '../../store/actions/user.actions';
import { BaseComponent } from 'src/core/base.component';
import * as fromSelectors from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  isLoading$: Observable<boolean | undefined>;
  errors$: Observable<INewUser>;
  isSuccess$: Observable<boolean | undefined>;
  isLoading: boolean = false;
  errors: INewUser = {};

  checkoutForm = this.formbuilder.group({
    email: '',
    password: '',
  });

  constructor(
    private formbuilder: FormBuilder,
    private store: Store<IUserState>,
    private router: Router
  ) {
    super();
    this.isLoading$ = this.store.pipe(select(fromSelectors.isLoading));
    this.isSuccess$ = this.store.pipe(select(fromSelectors.isSuccess));
    this.errors$ = this.store.pipe(select(fromSelectors.getErrors));
  }

  onSubmit(): void {
    this.store.dispatch(login({ credentials: this.checkoutForm.value }));
  }

  ngOnInit(): void {
    this.isSuccess$.subscribe((isSuccess) => {
      console.log(isSuccess);
      if (isSuccess) this.router.navigate(['/']);
    });
    this.isLoading$.subscribe((isLoading) => {
      if (isLoading !== undefined) this.isLoading = isLoading;
    });
    this.errors$.subscribe((errors) => {
      if (errors !== undefined) this.errors = errors;
    });
  }
}
