import { AuthService } from './../../auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    if (!this.auth.getToken()) {
      await this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
