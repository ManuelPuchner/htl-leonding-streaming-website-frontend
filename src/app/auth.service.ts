import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor(private cookieService: CookieService) {
    this.isAuthenticated = this.cookieService.check('token');
  }

  login() {
    this.isAuthenticated = true;
    this.cookieService.set('token', "someToken");

  }

  logout() {
    this.isAuthenticated = false;
    this.cookieService.delete('token');
  }
}
