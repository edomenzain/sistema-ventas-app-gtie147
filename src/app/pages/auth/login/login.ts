import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../servicies/auth.service';
import { BaseForm } from '../../../shared/utils/base-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  hide = true;

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });
  constructor(private fb: FormBuilder, 
              public baseForm: BaseForm,
              private authSvc: AuthService,
              private router: Router) { }

  onSubmit() {
    const { username, password } = this.loginForm.getRawValue();
    
    this.authSvc.login(username!, password!).subscribe();
  }

}
