import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface ISuccess {
  code: number,
  message: string,
  success: boolean,
  data: any
}

export interface ILogin extends ISuccess {
  data: {
    token: string
  }
}

export interface IUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: string,
  friends: number,
  followers: number,
  status: string,
}

export interface ISignup extends ISuccess {
  data: IUser
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * remove token from the local storage
   * @returns
   */
  doLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    return true;
  }


  /**
   * set auth token to local storage
   * @param token
   */
  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  /**
   * Get auth from the local storage
   * @returns
   */
  getToken(): string {
    return localStorage.getItem('authToken');
  }

  /**
   * Authenticate user
   * @returns
   */
  isAuthenticated() {
    const token = this.getToken();
    if(!token) {
      return false;
    }
    return true;
  }

  doLogin(data: Partial<IUser>): Observable<ILogin> {
    return this.httpClient.post<ILogin>(environment.apiUrl + '/auth/login', data)
      .pipe(
        retry(1),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  doSignup(data: Partial<IUser>): Observable<ISignup> {
    return this.httpClient.post<ISignup>(environment.apiUrl + '/auth/signup', data)
      .pipe(
        retry(1),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
