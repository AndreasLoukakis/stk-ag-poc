import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces';
import { __values } from 'tslib';

@Component({
  selector: 'stk-error-container',
  template: `
    <ng-container *ngIf="group && group.controls && group.controls[config.name] &&
    group.controls[config.name].errors">
      <ng-container *ngFor="let error of group.controls[config.name].errors | keyvalue;let i = index">
        <p *ngIf="i === 0"
          class="pf-c-form__helper-text">
          {{ renderMessage(config.title, error) }}
        </p>
      </ng-container>
    </ng-container>`,
  styleUrls: ['./error-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ErrorContainerComponent {

  @Input()
  config: FieldConfig;

  @Input()
  group: FormGroup;

  constructor() { }

  /** TODO: delegate actual message to X translation service */
  renderMessage(title: string, error: {key: string, value: any}) {
    // custom validations should have a message function
    if (error.value.message) {
      if (typeof error.value.message === 'function') {
        return error.value.message(title);
      }
      return error.value.message;
    }

    // handling angular validations
    return error.key === 'required' ? `${title} is required` :
      error.key === 'max' ? `${title} can't be more than ${error.value.max}` :
      error.key === 'min' ? `${title} can't be less than ${error.value.min}` :
      error.key === 'minlength' ? `${title} should have at least ${error.value.requiredLength} characters` :
      error.key === 'maxlength' ? `${title} should have no more than ${error.value.requiredLength} characters` :
      error.key === 'email' ? `${title} should be a valid email` :
      // Generic invalid message
      `${title} is invalid`;
  }

}
