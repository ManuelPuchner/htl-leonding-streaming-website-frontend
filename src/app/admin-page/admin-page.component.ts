import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  passwordForm;
  authService;

  constructor(authService: AuthService, private formBuilder: FormBuilder) {
    this.authService = authService;
    this.passwordForm = this.formBuilder.group({
      password: '',
    });
  }

  onSubmit() {
    //TODO: actually check the password
    if (this.passwordForm.value.password === '') {
      this.authService.login();
    }
  }
}
