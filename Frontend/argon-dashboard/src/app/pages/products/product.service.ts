import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ISuccess } from '../../layouts/auth-layout/service/auth.service';

export interface IProduct {
  productId: string,
  name: string
  category: string
  creationDate: string
  price: number
  quantity: number
  status: string
}

export interface IGetProducts extends ISuccess {
  data: {
    items: IProduct[],
    total: number
  }
}

export interface IGetProduct extends ISuccess {
  data: IProduct
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProducts(options?): Observable<IGetProducts> {
    return this.httpClient.post<IGetProducts>(environment.apiUrl + '/product/search', options)
      .pipe(
        retry(1),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  createProduct(product: IProduct): Observable<IGetProducts> {
    return this.httpClient.post<IGetProducts>(environment.apiUrl + '/product', product)
      .pipe(
        retry(1),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  deleteProduct(id: string): Observable<any> {
    return this.httpClient.delete<any>(environment.apiUrl + `/product/${id}`)
      .pipe(
        retry(1),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
