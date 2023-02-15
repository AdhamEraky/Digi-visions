import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ProductsService } from '../../services/products.service';
import { ProductsListComponent } from '../products-list/products-list.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  submitLoading!: boolean;
  addProductForm!: FormGroup;
  categoriesList: any;
  fileToUpload: any;
  imageUrl: any;

  constructor(
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<ProductsListComponent>,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initAddProductForm();
    this.getAllCategories();
  }

  getAllCategories() {
    this.productsService.getAllCategories().subscribe((data) => {
      this.categoriesList = data;
    });
  }
  private initAddProductForm(): void {
    this.addProductForm = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      image: new FormControl(null),
    });
  }

  public get title() {
    return this.addProductForm.get('title');
  }

  public get price() {
    return this.addProductForm.get('price');
  }

  public get description() {
    return this.addProductForm.get('description');
  }

  public get category() {
    return this.addProductForm.get('category');
  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      this.addProductForm.patchValue({
        image: this.imageUrl,
      });
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  addProduct() {
    this.addProductForm.markAllAsTouched();
    if (this.addProductForm.valid) {
      this.submitLoading = true;
      const payload = this.addProductForm.value;
      this.productsService.addProduct(payload).subscribe({
        next: (res) => {
          this.submitLoading = false;
          this.dialogRef.close(res);
          this.notificationService.success(
            'Product added successfully and its added to end of the table'
          );
        },
        error: () => {
          this.submitLoading = false;
          this.notificationService.error('Something went wrong');
        },
      });
    }
  }
}
