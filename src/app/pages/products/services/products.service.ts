import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getAllProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  public getAllCategories() {
    return this.http.get<Product[]>(`${this.apiUrl}/products/categories`);
  }

  public getProductById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  public addProduct(payload: any) {
    return this.http.post<Product>(`${this.apiUrl}/products`, payload);
  }

  public updateProduct(id: string, payload: any) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, payload);
  }

  public deleteProduct(id: string) {
    return this.http.delete<Product>(`${this.apiUrl}/products/${id}`);
  }
}
