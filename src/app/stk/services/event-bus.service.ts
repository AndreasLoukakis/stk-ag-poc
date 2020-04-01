import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  private emitter = new Subject<any>();

  constructor() { }

  on(event: Events, action: any): Subscription {
    return this.emitter.pipe(
      filter((e: EmitEvent) => {
        return e.name === event;
      }),
      map((e: EmitEvent) => {
        return e.value;
      })
    )
    .subscribe(action);
  }

  emit(event: EmitEvent) {
    this.emitter.next(event);
  }
}

export class EmitEvent {
  constructor(public name: Events, public value?: any) {}
}

export enum Events {

}
