import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  private debugState$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  debug$ = this.debugState$.asObservable();

  constructor() { }

  setDebugMode(state: boolean) {
    this.debugState$.next(state);
  }
}
