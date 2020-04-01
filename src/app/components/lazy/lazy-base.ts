import { OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { OpenapiService } from '../../stk/services/openapi.service';
import { HalService } from '../../stk/services/hal.service';

import { ResourceData } from './../../models';
import { ExtendedFieldConfig, ResourceInfo, ResourceDataValues } from './../../stk/interfaces';
import { DynamicClass } from './../../openapi-stubs/dynamic-class-proxy';

export abstract class LazyBase implements OnInit, OnChanges, OnDestroy {

  @Input() renderInfo: ResourceInfo;
  @Input() resourceUpdated: any;

  resourceData$: Subject<ResourceData> = new Subject();
  resourceDataValues$: Subject<ResourceDataValues> = new Subject();

  resources: string[];
  properties: string[];
  subs: Subscription[] = [];

  config: ExtendedFieldConfig;
  formgroup: FormGroup = new FormGroup({});

  valuesCallback: (item: any) => any;

  constructor(
    protected openapiService: OpenapiService,
    protected halService: HalService,
    // protected events: EventBusService
  ) { }

  ngOnInit(): void {
    this.setConfig();
    if (!this.valuesCallback) {
      this.valuesCallback = (item) => ({
        name: item[this.config.descriptionProp],
        value: item.id
      });
    }
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
        this.halService.getFormatedResources(this.renderInfo, this.resources, this.properties)
          .subscribe(data => {
            // get own meta and pass to each subresource
            // const className = `${Utils.nameToClass(this.renderInfo.propertyName)}Dto`;
            const instance = new DynamicClass(
              'ApplicationDto'
            );
            console.log('instance data ', instance);
            Object.keys(data.resources).map(key => {
              if (instance[key]) {
                data.resources[key].meta = instance[key];
              }
            });
            this.resourceData$.next(data);
            // this.setupStateChanges();
          })
      );
    }

    if (this.renderInfo.values) {
      this.config.x_lookupItems$ = this.resourceDataValues$.pipe(map(data => data.items));
      this.subs.push(
        this.halService.getResourceValues(this.renderInfo)
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
    this.properties = meta.properties || [];
    this.resources = meta.resources || [];

    const config = {
      title: meta.title,
      value: this.renderInfo[meta.valueProp],
      required: meta.required === true,
      name: meta.name,
    };
    this.config = config;
  }

  // updateState(e: {value: any, formData: any}) {
  //   const newVal = e.value;
  //   console.log('updating val ', newVal);
  //   this.halService.updateResource(
  //     this.renderInfo.href,
  //     this.openapiService.getMeta(this.renderInfo.propertyName).valueProp,
  //     newVal
  //   ).pipe(take(1)).subscribe(_ => {
  //     console.log('asdfasdf', this.resourceUpdated);
  //     if (this.resourceUpdated && typeof this.resourceUpdated === 'function') {
  //       this.resourceUpdated(newVal);
  //     }
  //   });
  // }


}
