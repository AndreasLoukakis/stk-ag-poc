import { Input, Output, EventEmitter, AfterViewInit, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { FieldConfig } from '../common/interfaces';
import { StkValidators } from '../common/stk-validators';
import { TextBehavior } from '../common/interfaces';


export abstract class FormElement implements AfterViewInit, OnDestroy, OnInit, OnChanges {

  /**
   * Required. An object of type FieldConfig {@link FieldConfig} with all necessary data / meta
   */
  @Input()
  config: FieldConfig;

  /**
   * Required. The FormGroup this input is part of
   */
  @Input()
  group: FormGroup;

  /**
   * Applies only to class decorated with @HasBehavior()
   * Form element behavior, such as uppercase, could be alternatively passed through input [behavior]="['uppercase', ..]"
   * Prefered way is via FieldConfig.x_behavior: ['uppercase', 'EL_EN']
   */
  @Input()
  behavior: TextBehavior[] = [];

  /**
   * Show or hide validation message
   */
  @Input()
  showValidationMessage = true;

  /**
   * Show / hide success icon when input is valid
   */
  @Input()
  showSuccess = false;

  /**
   * Emits changed value if FieldConfig.x_state_changer
   */
  @Output() stateChanger = new EventEmitter<any>();

  subscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    if (this.config && this.config.name) {
      this.initFormControl();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config && changes.config.currentValue) {
      this.initFormControl();
      this.setupStateChanger();
    }
  }

  ngAfterViewInit() {
    this.setupStateChanger();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initFormControl() {
    const validators = [];
    if (this.config.required) {
      validators.push(Validators.required);
    }

    if (this.hasValidations()) {
      this.config.x_validation.map(v => {
        // if validator requires a param, the string should be validator:param
        const vArray = v.split(':');

        // TODO: add hook to use custom validators
        if (StkValidators[vArray[0]]) {
          this.addValidationFrom(StkValidators, vArray, validators);
        } else if (Validators[vArray[0]]) {
          this.addValidationFrom(Validators, vArray, validators);
        }
      });
    }
    this.group.addControl(this.config.name, new FormControl(this.config.value, validators));
  }

  setupStateChanger() {
    if (this.subscription) { this.subscription.unsubscribe(); }
    if (this.config && this.config.x_state_changer) {
      this.subscription = this.group.get(this.config.name).valueChanges
        .pipe(debounce(val => interval(300)))
        .subscribe( (newVal) => {
          // if (this.group.get(this.config.name).status === 'VALID') {
            // TODO: deep clone data
          const data = {...this.group.value};
          this.stateChanger.emit({[this.config.name]: newVal, formData: data});
          // }
      });
    }
  }

  private addValidationFrom(methods, vArray, validators) {
    if (  (methods === Validators && typeof methods[vArray[0]] === 'function') ||
          (methods === StkValidators && typeof methods[vArray[0]]() === 'function')) {
      if (vArray[1] === undefined) {
        throw new Error('Custom validation function is missing a parameter [stk-forms]');
      }
      validators.push(methods[vArray[0]](vArray[1]));
    } else {
      validators.push(methods[vArray[0]]);
    }
  }

  private hasValidations() {
    return this.config.x_validation && this.config.x_validation.length > 0 && Array.isArray(this.config.x_validation);
  }

}
