import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormElement } from '../form-elements-base';

@Component({
  selector: 'stk-simple-select',
  styleUrls: ['simple-select.component.scss'],
  template: `
    <ng-template #noConfig><div class="d-form__element pf-c-form__group">No config provided for simple select</div></ng-template>
    <ng-container *ngIf="!!config; else noConfig">
      <div *ngIf="!config.x_readonly"
        class="d-form__element pf-c-form__group"
        [formGroup]="group">
        <label class="pf-c-form__label"><span class="pf-c-form__label-text">{{ config.title }}</span></label>
        <select [formControlName]="config.name" [(value)]="config.value"
          [attr.aria-invalid]="!!group.controls[config.name].errors"
          class="pf-c-form-control"
          [attr.disabled]="config.x_readonly || config.x_disabled ? true : null"
          [ngClass]="{'pf-m-success': showSuccess && !group.controls[config.name].errors}">
          <option value="">{{config.x_placeholder || " "}}</option>
          <option
            *ngFor="let option of config.x_lookupItems$ | async"
            value="{{option.value}}">{{option.name}}</option>
        </select>
        <stk-error-container *ngIf="showValidationMessage" [group]="group" [config]="config"></stk-error-container>
      </div>
      <ng-container *ngIf="config.x_readonly"><stk-plain-text [group]="group" [config]="config"></stk-plain-text></ng-container>
    <ng-container>
  `
})
export class SimpleSelectComponent extends FormElement implements AfterViewInit {

  @Output() selectStateChange = new EventEmitter<{[key: string]: string}>();
  constructor() { super(); }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    // if (this.config && this.config.x_state_changer) {
    if (this.config) {
      this.group.get(this.config.name).valueChanges
        .subscribe( (newVal) => {
          // if (this.group.get(this.config.name).status === 'VALID') {
            // TODO: deep clone data
          const data = {...this.group.value};
          this.selectStateChange.emit({[this.config.name]: newVal});
          // }
      });
    }
  }




}
