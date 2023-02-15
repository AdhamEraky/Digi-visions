import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ProductsService } from '../../services/products.service';
import { ProductsListComponent } from '../products-list/products-list.component';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  submitLoading!: boolean;
  updateProductForm!: FormGroup;
  productId!: string;
  fileToUpload: any;
  imageUrl: any;
  categoriesList: any;
  productDetails: any;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  constructor(
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<ProductsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.productId = this.data.productId;
    this.loadProduct(this.productId);
    this.initUpdateProductForm();
    this.getAllCategories();
  }

  getAllCategories() {
    this.productsService.getAllCategories().subscribe((data) => {
      this.categoriesList = data;
    });
  }

  private loadProduct(id: string) {
    this.productsService.getProductById(id).subscribe((res) => {
      this.productDetails = res
      this.updateProductForm.patchValue({
        id: res.id,
        title: res.title,
        price: res.price,
        description: res.description,
        category: res.category,
        image: res.image,
      });
    });
  }

  private initUpdateProductForm(): void {
    this.updateProductForm = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      image: new FormControl(null),
    });
  }

  public get title() {
    return this.updateProductForm.get('title');
  }

  public get price() {
    return this.updateProductForm.get('price');
  }

  public get description() {
    return this.updateProductForm.get('description');
  }

  public get category() {
    return this.updateProductForm.get('category');
  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      this.updateProductForm.patchValue({
        image: this.imageUrl,
      });
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  updateProduct(): void {
    this.updateProductForm.markAllAsTouched();
    if (this.updateProductForm.valid) {
      this.submitLoading = true;
      const payload = this.updateProductForm.value;
      this.productsService.updateProduct(this.productId, payload).subscribe({
        next: (res) => {
          this.submitLoading = false;
          this.dialogRef.close(res);
          this.notify.success('Product updated successfully');
        },
        error: () => {
          this.submitLoading = false;
        },
      });
    }
  }
}
