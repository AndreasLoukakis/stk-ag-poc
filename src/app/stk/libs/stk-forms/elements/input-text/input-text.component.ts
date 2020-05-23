import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { FormElementWithBehavior } from '../form-elements-behavior';
import { InputTypes } from '../../common/interfaces';
import { StkHelpers as h } from '../../common/stk-helpers';


@Component({
  selector: 'stk-text-input',
  template: `
  <div
    class="d-form__element pf-c-form__group"
    [formGroup]="group">
    <label class="pf-c-form__label" for="{{config.name}}">
      <span class="pf-c-form__label-text">{{ config.title }}</span>
    </label>
    <input #currentInput class="pf-c-form-control"
      [stkChangeCase]="behave(asChangeCase.bind(this))"
      [stkMapLanguage]="behave(asTranslate.bind(this))"
      [stkMath]="behave(asMath.bind(this))"
      [stkAppend]="behave(asAppend.bind(this))"
      [stkPrepend]="behave(asPrepend.bind(this))"
      [readonly]="config.x_readonly || config.x_disabled"
      [attr.placeholder]="config.x_placeholder"
      [formControlName]="config.name"
      [attr.aria-invalid]="!!(group.controls && group.controls[config.name] && group.controls[config.name].errors)"
      type="{{inputType}}"/>
    <stk-error-container *ngIf="showValidationMessage" [group]="group" [config]="config"></stk-error-container>
  </div>
  `
})
export class InputTextComponent extends FormElementWithBehavior implements OnInit {

  @Input()
  inputType: InputTypes = InputTypes.text;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    const type: string[] = h.valueOrDefault(this, 'config.type', '').split('.');
    if (type.length > 0 && type[1] in InputTypes) {
      this.inputType = InputTypes[type[1]];
    }
  }

}

