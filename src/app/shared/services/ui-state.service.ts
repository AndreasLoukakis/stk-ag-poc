import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  defaultState: UIStateInterface = {
    debug: false
  };

  // tslint:disable-next-line:variable-name
  private _state$: BehaviorSubject<UIStateInterface> = new BehaviorSubject(this.defaultState);
  state$ = this._state$.asObservable();

  constructor() { }

  private getStateSnapshot() {
    return this._state$.getValue();
  }

  setDebugMode(mode: boolean) {
    this._state$.next({...this.getStateSnapshot(), debug: mode});
  }
}

export interface UIStateInterface {
  debug: boolean;
}
