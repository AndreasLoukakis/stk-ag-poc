import { Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ApiService, InitResourceResponse } from '../services/api.service';
import { ResourceInfo } from './../interfaces';
import { BaseComponent } from './base-component';

export abstract class ComplexBaseComponent extends BaseComponent {

  @Output() childResourceStateChange = new EventEmitter<{[key: string]: any}>();
  // // Info feed for dynamic subresources
  // subResourceInfo$: Subject<{ [key: string]: ResourceInfo }> = new Subject();

  constructor(
    protected api: ApiService
  ) {  super(api);  }


  // setContext() {
  //   if (this.renderInfo) {
  //     if (this.dataSubscription) { this.dataSubscription.unsubscribe(); }
  //     this.dataSubscription = this.api.initResource(this.renderInfo).subscribe(
  //       ({renderData, subResources}: InitResourceResponse) => {
  //         this.renderDataChanges$.next(renderData);
  //         this.subResourceInfo$.next(subResources);
  //       }
  //     );
  //   }
  // }

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
