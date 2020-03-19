import { OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { OpenapiService } from './../../services/openapi.service';
import { HalService } from './../../services/hal.service';

import { ResourceInfo, ResourceData, ResourceDataValues } from './../../models';

export abstract class LazyBase implements OnInit, OnChanges, OnDestroy {

  @Input() renderInfo: ResourceInfo;
  // using Subject instead of Observable in rendering, to avoid flicker on data re-fetch
  resourceData$: Subject<ResourceData> = new Subject();
  resourceDataValues$: Subject<ResourceDataValues> = new Subject();

  resources: string[];
  properties: string[];
  subs: Subscription[] = [];

  constructor(
    protected openapiService: OpenapiService,
    protected halService: HalService
  ) { }

  ngOnInit(): void {
    if (this.renderInfo) {
      this.initData();
    }
  }

  /**
   *
   * @param changes
   * This will NOT fire if there is no template binding to the input!
   * We can go around this with accessors or manually triggering ngOnChanges
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.renderInfo &&
        changes.renderInfo.currentValue &&
        changes.renderInfo.currentValue !== changes.renderInfo.previousValue) {
            this.initData();
    }
  }

  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe());
  }

  initData() {
    this.subs.push(
      this.halService.getFormatedResource(this.renderInfo, this.resources, this.properties)
        .subscribe(data => this.resourceData$.next(data))
    );
    if (this.renderInfo.values) {
      this.subs.push(
        this.halService.getResourceValues(this.renderInfo.values)
          .subscribe(data => this.resourceDataValues$.next(data))
      );
    }
  }

}
