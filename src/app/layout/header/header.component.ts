import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IUser } from './../../models/user';
import { IUserState } from 'src/app/store/reducers/user.reducers';
import * as fromSelectors from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: IUser | undefined;
  user$: Observable<IUser | undefined>;

  constructor(private readonly store: Store<IUserState>) {
    this.user$ = this.store.pipe(select(fromSelectors.getMe));
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
