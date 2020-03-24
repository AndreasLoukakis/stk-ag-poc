import { Component, OnInit, NgModule } from '@angular/core';
import { LazyBase } from './../lazy-base';
import { OpenapiService } from './../../../services/openapi.service';
import { HalService } from './../../../services/hal.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-loan-type',
  templateUrl: './loan-type.component.html',
  styleUrls: ['./loan-type.component.scss']
})
export class LoanTypeComponent extends LazyBase {

  resources = ['consumerProduct'];
  properties = ['id', 'name'];
  constructor(
    openapiService: OpenapiService,
    halService: HalService
  ) { super(openapiService, halService); }

  valuesCallback = (item) => ({
    name: item.name,
    value: item.id
  })

}

@NgModule({
  declarations: [LoanTypeComponent],
  imports: [SharedModule],
  providers: []
})
class LoantypeModule {}
