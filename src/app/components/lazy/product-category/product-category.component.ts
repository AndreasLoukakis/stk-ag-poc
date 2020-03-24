import { Component, OnInit, NgModule } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';
import { OpenapiService } from './../../../services/openapi.service';
import { HalService } from './../../../services/hal.service';
import { LazyBase } from './../lazy-base';

@Component({
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent extends LazyBase implements OnInit {

  resources = [];
  properties = ['id', 'code', 'description', 'disabled', 'loanType'];

  constructor(
    private hal: HalService,
    private openapi: OpenapiService
  ) { super(openapi, hal); }


  valuesCallback = (item) => ({
    name: item.description,
    value: item.id
  })

}
@NgModule({
  declarations: [ProductCategoryComponent],
  imports: [SharedModule],
  providers: []
})
class BranchModule {}
