import { Component, NgModule, AfterViewInit } from '@angular/core';
import { ComplexBaseComponent } from './../../../stk/abstract/complex-base-component';
import { ApiService } from '../../../stk/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
  providers: [{provide: ComplexBaseComponent, useExisting: ProductCategoryComponent}]
})
export class ProductCategoryComponent extends ComplexBaseComponent implements AfterViewInit {

  constructor(
    api: ApiService
  ) { super(api); }

  ngAfterViewInit() {
    this.setContext();
  }
}

@NgModule({
  declarations: [ProductCategoryComponent],
  imports: [SharedModule]
})
class ProductCategoryModule {}
