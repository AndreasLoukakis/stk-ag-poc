import { Component, OnInit, NgModule } from '@angular/core';
import { LazyBase } from './../lazy-base';
import { OpenapiService } from './../../../services/openapi.service';
import { HalService } from './../../../services/hal.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent extends LazyBase implements OnInit {

  resources = ['productCategory', 'factoryProduct', 'currency'];
  properties = ['id'];

  constructor(
    openapiService: OpenapiService,
    halService: HalService
  ) { super(openapiService, halService); }


}
@NgModule({
  declarations: [CurrencyComponent],
  imports: [SharedModule],
  providers: []
})
class CurrenncyModule {}

