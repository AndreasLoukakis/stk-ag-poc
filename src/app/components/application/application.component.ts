import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HalService } from './../../services/hal.service';
import { OpenapiService  } from './../../services/openapi.service';
import { ResourceProperty } from './../../models';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  @Input() resourceName: string;
  @Input() href: string;

  resourceData$: Observable<{[key: string]: ResourceProperty}>;

  propPlaceholders: string[] = [
    'channel', 'branch', 'branchOther', 'loanType', 'consumerProduct'
  ];

  constructor(
    private hal: HalService,
    private openapi: OpenapiService
  ) { }

  ngOnInit(): void {
    this.resourceData$ = this.hal.getFormatedResource(this.href, this.propPlaceholders);
  }

}


