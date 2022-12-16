import { getLoginSuccess } from './../../store/selectors/user.selectors';
import { AuthService } from './../../auth.service';
import { Observable } from 'rxjs';
import { verify } from './../../store/actions/user.actions';
import { IUserState } from './../../store/reducers/user.reducers';
import { Store, select } from '@ngrx/store';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit {
  loginSuccess$: Observable<boolean | null>;
  constructor(
    private store: Store<IUserState>,
    private authService: AuthService
  ) {
    this.loginSuccess$ = this.store.pipe(select(getLoginSuccess));
  }

  verify() {
    this.store.dispatch(verify());
  }

  ngOnInit(): void {
    this.loginSuccess$.subscribe((loginSuccess) => {
      if (loginSuccess) {
        this.verify();
      }
    });
    if (this.authService.getToken()) {
      this.verify();
    }
  }
}
