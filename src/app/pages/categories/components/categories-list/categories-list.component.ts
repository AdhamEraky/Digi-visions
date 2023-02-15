import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/pages/products/services/products.service';
import { CategoriesService } from '../../service/categories.service';
import { TruncateModule } from 'ng2-truncate';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {
  categoriesList: any;
  categoryProductsList: any;
  showMatSpinner: boolean = false;

  constructor(
    public dialog: MatDialog,
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.productsService.getAllCategories().subscribe((data) => {
      this.categoriesList = data;
    });
  }

  getCategoryProducts(category: any) {
    this.categoryProductsList = null;
    this.showMatSpinner = true;
    this.categoriesService.getCategoryProduct(category).subscribe((data) => {
      this.showMatSpinner = false;
      this.categoryProductsList = data;
    });
  }

  productDetails(productId: string) {
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      width: '700px',
      autoFocus: false,
      data: {
        productId: productId,
      },
    });
  }
}
