import { Component, OnInit, NgModule, OnChanges, SimpleChanges } from '@angular/core';

import { LazyBase } from './../lazy-base';
import { OpenapiService } from './../../../services/openapi.service';
import { HalService } from './../../../services/hal.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent extends LazyBase implements OnInit, OnChanges {

  resources = [];
  properties = ['id', 'code', 'description', 'disabled'];

  constructor(
    openapiService: OpenapiService,
    halService: HalService
  ) { super(openapiService, halService); }

}

@NgModule({
  declarations: [BranchComponent],
  imports: [SharedModule],
  providers: []
})
class BranchModule {}
