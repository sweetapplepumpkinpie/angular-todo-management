import { verify } from './../../store/actions/user.actions';
import { IUserState } from './../../store/reducers/user.reducers';
import { Store } from '@ngrx/store';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit {
  constructor(private store: Store<IUserState>) {}

  ngOnInit(): void {
    if (window.localStorage.getItem('token')) {
      this.store.dispatch(verify());
    }
  }
}
