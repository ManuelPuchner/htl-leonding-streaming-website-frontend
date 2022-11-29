import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.isAuthenticated = this.cookieService.check('token');
  }

  login(password: string) {
    this.http
      .post('/api/admin/login', { password }, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.isAuthenticated = true;
        }
      });
  }

  logout() {
    this.isAuthenticated = false;
    this.cookieService.delete('token');
  }
}
