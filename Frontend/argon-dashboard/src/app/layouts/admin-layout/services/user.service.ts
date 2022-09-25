import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ISuccess, IUser } from '../../auth-layout/service/auth.service';


export interface IGetUsers extends ISuccess {
  data: {
    items: IUser[],
    total: number
  }
}
export interface IGetUser extends ISuccess {
  data: IUser
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(Options?): Observable<IGetUsers> {
    return this.httpClient.post<IGetUsers>(environment.apiUrl + '/user', Options)
      .pipe(
        retry(1),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  set currentUser(user) {
    localStorage.setItem('currentUser',JSON.stringify(user))
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'))
  }

  getProfile(): Observable<IGetUser> {
    return this.httpClient.get<IGetUser>(environment.apiUrl + '/user/profile')
      .pipe(
        retry(1),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete<any>(environment.apiUrl + `/user/${id}`)
      .pipe(
        retry(1),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
