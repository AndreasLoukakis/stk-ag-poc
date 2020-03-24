import { Component, OnInit, NgModule } from '@angular/core';
import { LazyBase } from './../lazy-base';
import { OpenapiService } from './../../../services/openapi.service';
import { HalService } from './../../../services/hal.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  templateUrl: './consumer-factory-product.component.html',
  styleUrls: ['./consumer-factory-product.component.scss']
})
export class ConsumerFactoryProductComponent extends LazyBase implements OnInit {

  resources = [];
  properties = ['id', 'code', 'description', 'disabled'];

  constructor(
    openapiService: OpenapiService,
    halService: HalService
  ) { super(openapiService, halService); }

  valuesCallback = (item) => ({
    name: item.description,
    value: item.id
  })

}

@NgModule({
  declarations: [ConsumerFactoryProductComponent],
  imports: [SharedModule],
  providers: []
})
class ConsumerProductModule {}
