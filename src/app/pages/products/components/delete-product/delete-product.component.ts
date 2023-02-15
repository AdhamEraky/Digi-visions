import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ProductsService } from '../../services/products.service';
import { ProductsListComponent } from '../products-list/products-list.component';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss'],
})
export class DeleteProductComponent implements OnInit {
  submitLoading!: boolean;
  productId!: string;

  constructor(
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<ProductsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.productId = this.data.productId;
  }

  deleteCountry() {
    this.submitLoading = true;
    this.productsService.deleteProduct(this.productId).subscribe({
      next: (res) => {
        this.submitLoading = false;
        this.dialogRef.close(res);
        this.notify.success('Product deleted successfully');
      },
      error: () => {
        this.submitLoading = false;
      },
    });
  }
}
