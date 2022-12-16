import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getMe } from './../../store/selectors/user.selectors';
import { IUser } from './../../models/user';
import { Store, select } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';

import { IUserState } from 'src/app/store/reducers/user.reducers';
import { logout } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  user$: Observable<IUser | undefined>;
  @Input() email: string | undefined;

  constructor(
    private readonly store: Store<IUserState>,
    private readonly router: Router
  ) {
    this.user$ = this.store.pipe(select(getMe));
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.store.dispatch(logout());
  }
}
