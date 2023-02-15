import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../../products/models/product';
import { ProductsService } from '../../products/services/products.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getCategoryProduct(category: string) {
    return this.http.get<Product[]>(
      `${this.apiUrl}/products/category/${category}`
    );
  }
}
