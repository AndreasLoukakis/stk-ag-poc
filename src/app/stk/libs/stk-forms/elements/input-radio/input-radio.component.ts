import { Component, OnInit } from '@angular/core';
import { FormElement } from '../form-elements-base';

@Component({
  selector: 'stk-input-radio',
  template: `
  <div
    class="d-form__element pf-c-form__group"
    [formGroup]="group">
    <label class="pf-c-form__label" for="{{config.name}}">
      <span class="pf-c-form__label-text">{{ config.title }}</span>
    </label>
    some day....
  </div>
  `,
  styleUrls: ['./input-radio.component.scss']
})
export class InputRadioComponent extends FormElement {

  constructor() { super(); }

}
