import { verify } from './../../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { IUserState } from './../../store/reducers/user.reducers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {}
