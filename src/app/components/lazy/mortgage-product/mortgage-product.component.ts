import { Component, OnInit, NgModule } from '@angular/core';
import { LazyBase } from './../lazy-base';
import { OpenapiService } from './../../../services/openapi.service';
import { HalService } from './../../../services/hal.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  templateUrl: './mortgage-product.component.html',
  styleUrls: ['./mortgage-product.component.scss']
})
export class MortgageProductComponent extends LazyBase implements OnInit {

  resources = ['productCategory', 'factoryProduct', 'currency'];
  properties = ['id'];

  constructor(
    openapiService: OpenapiService,
    halService: HalService
  ) { super(openapiService, halService); }


}
@NgModule({
  declarations: [MortgageProductComponent],
  imports: [SharedModule],
  providers: []
})
class MortgageProductModule {}
