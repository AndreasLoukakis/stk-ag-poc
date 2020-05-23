import { Component, Input, Output } from '@angular/core';
import { FormElement } from '../form-elements-base';


@Component({
  selector: 'stk-checkbox-input',
  template: `
  <div
    class="d-form__element pf-c-check"
    [formGroup]="group">
    <label
      *ngIf="reverseLabel" for="{{config.name}}"
      [ngClass]="{'pf-m-disabled': config.x_readonly || config.x_disabled}"
      class="pf-c-check__label">{{ config.title }}
    </label>
    <input class="pf-c-check__input" type="checkbox"
      [formControlName]="config.name"
      [attr.disabled]="config.x_readonly || config.x_disabled ? true : null"
      id="{{config.name}}"
      name="{{config.name}}"
    />
    <label
      [ngClass]="{'pf-m-disabled': config.x_readonly || config.x_disabled}"
      *ngIf="!reverseLabel" for="{{config.name}}" class="pf-c-check__label">{{ config.title }}
    </label>
  </div>
  `
})
export class InputCheckboxComponent extends FormElement {

  @Input() reverseLabel: false;

  constructor() { super(); }
}
