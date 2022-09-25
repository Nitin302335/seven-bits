import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../layouts/auth-layout/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  isSubmitted = false;
  isSignup = false;
  isSignupFailed = false;
  errorMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['']
    });
  }

  get formControls() {
    return this.signupForm.controls;
  }

  signup() {
    this.isSubmitted = true;
    this.isSignup = false;
    console.log(`This`, this.signupForm.value);

    if(this.signupForm.invalid) {
      return;
    }
    this.authService.doSignup(this.signupForm.value).subscribe(response => {
      console.log('response : ', response);
      this.signedUpSuccess();
    }, (error ) => {
      console.log(`Error`, error, error?.error?.error);
      this.signUpFailed(error);
    });
  }

  signedUpSuccess () {
    this.isSignup = true;
    this.isSubmitted = false;
    this.errorMessage = undefined;
    this.signupForm.reset();
  }

  signUpFailed(error) {
    this.isSignup = false;
    this.errorMessage = error?.error?.error || 'Something went wrong';
  }


}
