import { Component, NgModule, AfterViewInit, OnInit } from '@angular/core';
import { ComplexBaseComponent } from '../../../stk/abstract/complex-base-component';
import { ApiService } from '../../../stk/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RenderData } from '../../../stk/interfaces';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
  providers: [{provide: ComplexBaseComponent, useExisting: ProductCategoryComponent}]
})
export class ProductCategoryComponent extends ComplexBaseComponent implements AfterViewInit, OnInit {

  constructor(
    api: ApiService
  ) { super(api); }

  ngAfterViewInit() {
    setTimeout(() => this.setContext());
  }

  ngOnInit() {
    // this.renderData$.pipe(
    //   map((data: RenderData) => {
    //     if (data.formElements && data.formElements.productCategory) {
    //       data.formElements.productCategory.x_state_changer = true;
    //     }
    //     return data;
    //   })
    // );
  }
}

@NgModule({
  declarations: [ProductCategoryComponent],
  imports: [SharedModule]
})
class ProductCategoryModule {}
