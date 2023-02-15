import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { sharedModule } from 'src/app/shared/shared.module';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { TruncateModule } from 'ng2-truncate';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    sharedModule,
    TruncateModule,
  ],
  declarations: [CategoriesListComponent, ProductDetailsComponent],
})
export class CategoriesModule {}
