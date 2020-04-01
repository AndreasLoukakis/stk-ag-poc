import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

import { ResourceData } from './../../models';

import { HalService } from '../../stk/services/hal.service';
import { OpenapiService  } from '../../stk/services/openapi.service';
import { LazyBase } from './../lazy/lazy-base';
import { ComplexBaseComponent } from './../../stk/abstract/complex-base-component';
import { ApiService } from './../../stk/services/api.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  providers: [{provide: ComplexBaseComponent, useExisting: ApplicationComponent}]
})
export class ApplicationComponent extends ComplexBaseComponent {

  // resources: string[] = [
  //   'channel', 'branch', 'branchOther', 'loanType', 'consumerProduct', 'morgateProduct'
  // ];
  // properties: [];

  constructor(
    protected api: ApiService
  ) { super(api); }

}


