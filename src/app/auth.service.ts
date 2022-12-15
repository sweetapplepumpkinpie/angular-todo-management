import { ICredentials } from './models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type TLoginResponse = {
  token: string;
};

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
}
