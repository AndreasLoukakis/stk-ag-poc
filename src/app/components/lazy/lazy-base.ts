import { OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { OpenapiService } from './../../services/openapi.service';
import { HalService } from './../../services/hal.service';

import { ResourceInfo, ResourceData, ResourceDataValues } from './../../models';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

export abstract class LazyBase implements OnInit, OnChanges, OnDestroy {

  @Input() renderInfo: ResourceInfo;
  // using Subject instead of Observable in rendering, to avoid flicker on data re-fetch
  resourceData$: Subject<ResourceData> = new Subject();
  resourceDataValues$: Subject<ResourceDataValues> = new Subject();

  resources: string[];
  properties: string[];
  subs: Subscription[] = [];

  valuesCallback: (item: any) => any = (item) => item;

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
        !changes.renderInfo.isFirstChange &&
        changes.renderInfo.currentValue &&
        changes.renderInfo.currentValue !== changes.renderInfo.previousValue) {
          this.initData();
    }
  }

  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe());
  }

  initData() {
    if (this.resources.length > 0 || this.properties.length > 0) {
      this.subs.push(
        this.halService.getFormatedResource(this.renderInfo, this.resources, this.properties)
          .subscribe(data => this.resourceData$.next(data))
      );
    }

    if (this.renderInfo.values) {
      this.subs.push(
        this.halService.getResourceValues(this.renderInfo.values, this.renderInfo.currieName)
          .pipe(map(data => {
            // this is per component instance transformation
            return data && data.items ?
              {...data, items: data.items.map(this.valuesCallback)} : data;
          }))
          .subscribe(data => {
            return this.resourceDataValues$.next(data);
          })
        );
    }
  }

}
