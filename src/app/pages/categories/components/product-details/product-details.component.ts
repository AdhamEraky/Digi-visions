import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/pages/products/services/products.service';
import { CategoriesListComponent } from '../categories-list/categories-list.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productId!: string;
  productDetails: any;

  constructor(
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<CategoriesListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.productId = this.data.productId;
    this.loadProduct(this.productId);
  }

  private loadProduct(id: string) {
    this.productsService.getProductById(id).subscribe((res) => {
      this.productDetails = res;
    });
  }
}
