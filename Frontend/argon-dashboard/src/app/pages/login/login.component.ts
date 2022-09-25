import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../layouts/auth-layout/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isSubmitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    this.isSubmitted = true;
    console.log(`this.loginForm.invalid : `, this.loginForm.invalid, this.loginForm.value);
    if(this.loginForm.invalid) {
      return;
    }
    this.authService.doLogin(this.loginForm.value).subscribe(response => {
      const token = response.data.token;
      this.authService.setToken(token);
      console.log('response : ', response);
      this.logInSuccess()
      this.router.navigate(['/','dashboard']);
    }, (error) => {
      this.loginFailed(error)
    });
  }

  logInSuccess() {
    this.isLoggedIn = true;
    this.isSubmitted = false;
    this.errorMessage = undefined;
  }

  loginFailed(error) {
    this.isLoggedIn = false;
    this.errorMessage = error?.error?.error || 'Something went wrong';
  }

  ngOnDestroy() {
  }

}
