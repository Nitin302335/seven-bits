import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from './reducers/auth.reducer';
import { TrackJsErrorHandler } from '../../error/error.handler';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({auth: AuthReducer})
    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: TrackJsErrorHandler
    }
  ]
})
export class AuthLayoutModule { }
