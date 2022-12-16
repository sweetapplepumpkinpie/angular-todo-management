import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICredentials } from './models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post('api/auth/register', data);
  }

  login(data: ICredentials) {
    return this.http.post('api/auth/login', data);
  }

  logout() {
    localStorage.removeItem('token');
    return new Observable();
  }

  verify() {
    return this.http.get('api/auth/verify');
  }

  getToken() {
    return window.localStorage.getItem('token');
  }
}
