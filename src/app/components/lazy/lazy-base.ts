import { OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { OpenapiService } from './../../services/openapi.service';
import { HalService } from './../../services/hal.service';

import { ResourceInfo, ResourceProperty } from './../../models';

export class LazyBase implements OnInit, OnChanges {

  @Input() renderInfo: ResourceInfo;
  resourceData$: Observable<{[key: string]: ResourceProperty}>;
  templatePlaceholders: string[];

  constructor(
    protected openapiService: OpenapiService,
    protected halService: HalService
  ) { }

  ngOnInit(): void {
    // this.halService.getResource(this.renderInfo.href);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('On changes fired ', changes.renderInfo);
    if (changes.renderInfo &&
        changes.renderInfo.currentValue &&
        changes.renderInfo.currentValue !== changes.renderInfo.previousValue) {
            console.log('Callinng resourcedata from base ', this.renderInfo.href);
            this.resourceData$ = this.halService.getFormatedResource(this.renderInfo.href, this.templatePlaceholders);
    }
  }

}

