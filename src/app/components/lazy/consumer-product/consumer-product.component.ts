import { Component, OnInit, NgModule } from '@angular/core';
import { LazyBase } from './../lazy-base';
import { OpenapiService } from './../../../services/openapi.service';
import { HalService } from './../../../services/hal.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-consumer-product',
  templateUrl: './consumer-product.component.html',
  styleUrls: ['./consumer-product.component.scss']
})
export class ConsumerProductComponent extends LazyBase implements OnInit {

  resources = [];
  properties = [];

  constructor(
    openapiService: OpenapiService,
    halService: HalService
  ) { super(openapiService, halService); }


}
@NgModule({
  declarations: [ConsumerProductComponent],
  imports: [SharedModule],
  providers: []
})
class BranchModule {}
