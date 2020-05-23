import { Input, Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { FormElement } from './form-elements-base';
import { TextBehavior } from '../common/interfaces';


export abstract class FormElementWithBehavior extends FormElement implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Form element behavior, such as uppercase, could be alternatively passed through input [behavior]="['uppercase', ..]"
   * Prefered way is via FieldConfig.x_behavior: ['uppercase', 'EL_EN']
   */
  @Input()
  behavior: TextBehavior[] = [];

  constructor() {
      super();
  }

  behave(callback) {
    return this.noBehavior() ? null : callback();
  }

  asChangeCase() {
    return this.getBehavior(TextBehavior.lowercase) ?
      'lower' : this.getBehavior(TextBehavior.uppercase) ?
      'upper' : this.getBehavior(TextBehavior.firstUp) ?
      'firstUp' : null;
  }

  asTranslate() {
    return  this.getBehavior(TextBehavior.EN_EL) ?
      'EN_EL' : this.getBehavior(TextBehavior.EL_EN) ?
      'EL_EN' : null;
  }

  asMath() {
    return this.getBehavior(TextBehavior.math);
  }

  asAppend() {
    const append = this.getBehavior(TextBehavior.append);
    if (append) {
      const appendArr = append.split(':');
      if (appendArr[1]) {
        return appendArr[1];
      }
    }
    return  null;
  }

  asPrepend() {
    const prepend = this.getBehavior(TextBehavior.prepend);
    if (prepend) {
      const prependArr = prepend.split(':');
      if (prependArr[1]) {
        return prependArr[1];
      }
    }
    return  null;
  }

  noBehavior() {
    return (!this.config || !this.config.x_behavior) && !this.behavior;
  }

  getBehavior(which: TextBehavior) {
    if (!this.config || !this.config.x_behavior) { return null; }
    return this.config.x_behavior ? this.config.x_behavior.find(b => b.includes(which)) :
      this.behavior ? this.behavior.find(b => b.includes(which)) :
      null;
  }

}

// export interface IFormElementWithBehavior {
//   noBehavior: () => boolean;
//   getBehavior: (which: string) => boolean | null;
//   behave: (callback: () => any) => null | void;
//   asChangeCase: () => string | null;
//   asTranslate: () => string | null;
//   asMath: () => boolean | null;
//   asAppend: () => string | null;
//   asPrepend: () => string | null;
//   initBehavior: () => void;
// }
