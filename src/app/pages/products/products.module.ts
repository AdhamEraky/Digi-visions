import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { sharedModule } from 'src/app/shared/shared.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

@NgModule({
  imports: [CommonModule, ProductsRoutingModule, sharedModule],
  declarations: [
    AddProductComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    ProductsListComponent,
  ],
})
export class ProductsModule {}
