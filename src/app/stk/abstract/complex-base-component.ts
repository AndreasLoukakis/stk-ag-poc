import { Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ApiService, InitResourceResponse } from '../services/api.service';
import { ResourceInfo } from './../interfaces';
import { BaseComponent } from './base-component';

export abstract class ComplexBaseComponent extends BaseComponent {

  protected renderInfoPlaceholder: ResourceInfo;

  get renderInfo(): ResourceInfo {
    return this.renderInfoPlaceholder;
  }
  @Input()
  set renderInfo(data: ResourceInfo) {
    this.renderInfoPlaceholder = data;
    this.setContext();
  }

  @Output() childResourceStateChange = new EventEmitter<{[key: string]: any}>();
  // Info feed for dynamic subresources
  subResourceInfo$: Subject<{ [key: string]: ResourceInfo }> = new Subject();

  constructor(
    protected api: ApiService
  ) { super(api); }


  setContext() {
    if (this.renderInfo) {
      if (this.dataSubscription) { this.dataSubscription.unsubscribe(); }
      this.dataSubscription = this.api.initResource(this.renderInfo).subscribe(
        (data: InitResourceResponse) => {
          this.renderData$.next(data.renderData);
          this.subResourceInfo$.next(data.subResources);
        }
      );
    }
  }

  patchAndPropagate(newValue: {[key: string]: string}) {
    const payload = { id: newValue[Object.keys(newValue)[0]]};
    console.log('propagating state change', payload);
    this.api.updateResource(this.renderInfo.href, payload)
    .pipe(take(1)).subscribe(_ => {
      console.log('updated, propagating');
      this.childResourceStateChange.emit(newValue);
    });
  }

  onStateChange(e: {[key: string]: string}) {
    console.log('triggering get because of state change', e);
  }

}
