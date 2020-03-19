import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

import { ResourceData } from './../../models';

import { HalService } from './../../services/hal.service';
import { OpenapiService  } from './../../services/openapi.service';
import { LazyBase } from './../lazy/lazy-base';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent extends LazyBase {

  resources: string[] = [
    'channel', 'branch', 'branchOther', 'loanType', 'consumerProduct'
  ];
  properties: [];

  constructor(
    protected hal: HalService,
    protected openapi: OpenapiService
  ) { super(openapi, hal); }

}


