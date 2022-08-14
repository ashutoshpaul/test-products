import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private readonly _httpService: HttpService,
  ) { }

  getCategories(): Observable<string[]> {
    return this._httpService.getCategories();
  }

  getProducts(): Observable<IProduct[]> {
    return this._httpService.getProducts();
  }

  getProduct(id: number): Observable<IProduct> {
    return this._httpService.getProduct(id);
  }

  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this._httpService.getProductsByCategory(category);
  }
}
