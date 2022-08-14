import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private readonly _http: HttpClient
  ) { }

  getCategories(): Observable<string[]> {
    return this._http.get<string[]>(`${environment.url}/products/categories`);
  }

  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(`${environment.url}/products`);
  }

  getProduct(id: number): Observable<IProduct> {
    return this._http.get<IProduct>(`${environment.url}/products/${id}`);
  }

  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(`${environment.url}/products/category/${category}`);
  }
}
