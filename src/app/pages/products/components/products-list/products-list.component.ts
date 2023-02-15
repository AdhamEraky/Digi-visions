import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'category',
    'price',
    'Edit',
    'Delete',
  ];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  loading = false;
  disableRoute = false;

  constructor(
    public dialog: MatDialog,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productsService.getAllProducts().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.loading = false;
      this.dataSource.paginator = this.paginator;
    });
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '500px',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res != undefined && res) {
        const data = this.dataSource.data;
        data.push(res);
        this.dataSource.data = data;
      }
    });
  }

  EditProduct(id: string) {
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      width: '500px',
      data: {
        productId: id,
      },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res != undefined && res) {
        const data = this.dataSource.data;
        data.forEach((item, index) => {
          if (item.id == res.id) {
            data[index] = res;
          }
        });
        this.dataSource.data = data;
      }
    });
  }

  deleteCountry(id: string) {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: '500px',
      data: {
        productId: id,
      },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res != undefined && res) {
        const data = this.dataSource.data;
        data.forEach((item, index) => {
          if (item.id == res.id) {
            data.splice(index, 1);
          }
        });
        this.dataSource.data = data;
      }
    });
  }
}
