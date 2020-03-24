import { OnInit, Input, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, Subscription, interval } from 'rxjs';
import { map, debounce, take } from 'rxjs/operators';

import { OpenapiService } from './../../services/openapi.service';
import { HalService } from './../../services/hal.service';

import { ResourceInfo, ResourceData, ResourceDataValues, PreFieldConfig } from './../../models';
import { FieldConfig } from 'stk-forms';

export abstract class LazyBase implements OnInit, OnChanges, OnDestroy {

  @Input() renderInfo: ResourceInfo;
  @Output() resourceUpdated: EventEmitter<any> = new EventEmitter();

  // using Subject instead of Observable in rendering, to avoid flicker on data re-fetch
  resourceData$: Subject<ResourceData> = new Subject();
  resourceDataValues$: Subject<ResourceDataValues> = new Subject();

  resources: string[];
  properties: string[];
  subs: Subscription[] = [];

  config: FieldConfig;
  formgroup: FormGroup = new FormGroup({});

  valuesCallback: (item: any) => any = (item) => item;

  constructor(
    protected openapiService: OpenapiService,
    protected halService: HalService
  ) { }

  ngOnInit(): void {
    this.setConfig();
    if (this.renderInfo) {
      this.initData();
    }
  }

  // setupStateChanges() {
  //   if (this.config && this.config.x_updateState) {
  //     console.log('connfig has ', this.config)
  //     this.subs.push(
  //       this.formgroup.get(this.config.name).valueChanges
  //         .pipe(debounce(val => interval(100)))
  //         .subscribe( (newVal) => {
  //           console.log('newval', newVal);
  //           // if (this.formgroup.get(this.config.name).status === 'VALID') {
  //           //   // TODO: deep clone data
  //           //   const data = {...this.formgroup.value};
  //           //   delete data.__proto__;
  //           //   // this.inputCallsResourceUpdate.emit(data);
  //           // }
  //         })
  //     );
  //   } else {
  //     console.log('no config');
  //   }
  // }

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
          this.setConfig();
          this.initData();
    }
  }

  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe());
  }

  /**
   * In a fully working scenario, the sequence of operations for each resource would include:
   * (assuming we already have renderInfo passed from parent)
   * A. [Static, available, Openapi] Get (static, in-app) resource metadata
   *    (correlation? currie?) and available operations
   * B. [Http, HAL] Get hal data for resource, including relations
   * C. [Local functions] Construct metadata + value object for each property,
   *    (implementing relevant interface) to pass for bindings
   * D. [Local functions] After filtering resource operations through HAL relations,
   *    create action context (whatever that means)
   *
   * Messing with interface properties and service seperatelly might not be so convenient -
   * it's probably a better idea to use classes and a factory for the properties, to get
   * everything in one class.
   */

  initData() {

    if (this.resources.length > 0 || this.properties.length > 0) {
      this.subs.push(
        this.halService.getFormatedResource(this.renderInfo, this.resources, this.properties)
          .subscribe(data => {
            this.resourceData$.next(data);
            // this.setupStateChanges();
          })
      );
    }

    if (this.renderInfo.values) {
      this.config.x_lookupItems$ = this.resourceDataValues$.pipe(map(data => data.items));
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

  setConfig(): void {
    const resourceName = this.renderInfo.propertyName;
    if (!resourceName) { return; }
    const meta = this.openapiService.getMeta(resourceName);

    const config = {
      title: meta.title,
      value: this.renderInfo[meta.valueProp],
      required: meta.required === true,
      name: meta.name,
    };
    this.config = config;
  }

  updateState(e: {value: any, formData: any}) {
    const newVal = e.value;
    console.log('updating val ', newVal);
    this.halService.updateResource(
      this.renderInfo.href,
      this.openapiService.getMeta(this.renderInfo.propertyName).valueProp,
      newVal
    ).pipe(take(1)).subscribe(this.resourceUpdated.emit);
  }

}
