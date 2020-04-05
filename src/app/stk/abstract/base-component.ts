import { Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

import { OnChange, OnChangeMsg } from './../decorators/on-change.decorator';

import { ApiService, InitResourceResponse } from '../services/api.service';
import { RenderData } from './../interfaces/render-data.interface';
import { ResourceInfo } from './../interfaces/resource-info.interface';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

export abstract class BaseComponent implements OnDestroy {

  // resourceInfo and not mandatory formgroup passed from parent
  @OnChange<ResourceInfo>(function(newVal, changeMsg: OnChangeMsg<ResourceInfo>) {
    this.setContext();
  })
  @Input() renderInfo: ResourceInfo;

  @Input() formgroup: FormGroup = new FormGroup({});

  // Own resource data fed to template as subject
  renderData$: Subject<RenderData> = new Subject();

  // declare local form elements, or get all complex properties from meta
  // Can be a flat or complex object, maping the form element structure
  formElements: { [key: string]: any };

  dataSubscription: Subscription;

  constructor(
    // api service coordinates openapi and hal services to provide proper structure
    // for component consumption
    protected api: ApiService
  ) {}

  ngOnDestroy() {
    if (this.dataSubscription) { this.dataSubscription.unsubscribe(); }
  }

  setContext() {
    if (this.renderInfo) {
      if (this.dataSubscription) { this.dataSubscription.unsubscribe(); }
      this.dataSubscription = this.api.initResource(this.renderInfo).subscribe(
        (data: InitResourceResponse) => {
          this.renderData$.next(data.renderData);
        }
      );
    }
  }

}
