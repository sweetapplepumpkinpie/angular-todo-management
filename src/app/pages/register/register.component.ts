import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { register } from '../../store/actions/user.actions';
import { IUserState } from '../../store/reducers/user.reducers';
import * as fromSelectors from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  checkoutForm = this.formbuilder.group({
    name: '',
    email: '',
    password: '',
  });

  isLoading$: Observable<boolean> = this.store.pipe(
    select(fromSelectors.isLoading)
  );

  constructor(
    private store: Store<IUserState>,
    private formbuilder: FormBuilder
  ) {}

  onSubmit(): void {
    this.store.dispatch(register({ user: this.checkoutForm.value }));
  }
}
