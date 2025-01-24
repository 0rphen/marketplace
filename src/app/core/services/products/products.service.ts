import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IProduct } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private readonly http: HttpClient) {}

  getCategories() {
    return this.http.get<string[]>(`${environment.baseUrl}/categories`);
  }

  getProducts() {
    return this.http.get<IProduct[]>(`${environment.baseUrl}`);
  }
}
