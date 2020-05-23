import { Component, EventEmitter, Input, OnChanges, OnInit, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';

import { FieldConfig } from '../../common/interfaces/field-config';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'stk-d-form',
  styleUrls: ['dform.component.scss'],
  template: `
    <form
      class="dynamic-form pf-c-form pf-l-flex"
      [formGroup]="form"
      (submit)="handleSubmit($event)">
      <ng-container
        *ngFor="let field of fields; let i = index"
        stkDField
        [config]="field"
        [readonly]="readonly"
        [formFnToCallUpdateState]="callResourceUpdate()"
        [group]="form">
      </ng-container>
    </form>
    <!--<div>Validity: {{this.form.valid}}</div>
    <pre>validation errors: {{formValidationErrors | json}}</pre>-->
  `
})
export class DFormComponent implements OnChanges, OnInit, OnDestroy {

  @Input()
  fields$: Observable<FieldConfig[]>;

  fields: FieldConfig[];

  @Input()
  layoutCols: number;

  @Input()
  readonly = false;

  @Input()
  parentForm: FormGroup | null;

  @Input()
  triggerMethod$: Observable<string>;

  @Output()
  formCallsResourceUpdate: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  formSubmit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  subscriptions: Subscription[] = [];

  verrors: any;

  get controls() { return this.fields && this.fields.filter(({type}) => type !== 'button'); }
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    if (!this.fields$) {
      throw new Error('No data passed to form or data are not of Observable type');
    }
    this.fields$.subscribe(
      data => {
        this.fields = data;
        this.form = this.createGroup();
      }
    );
    if (this.triggerMethod$) {
      this.subscriptions.push(
        this.triggerMethod$.subscribe(name => {
          if (!name || name === null) { return; }
          if (this[name] === undefined || typeof this[name] !== 'function') {
            throw new Error('Invalid form method trigger');
          }
          this[name]();
        })
      );
    }
  }

  get formValidationErrors() {
    return Object.keys(this.form.controls).map(key => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
          return Object.keys(controlErrors).map(keyError => {
            return 'Key: ' + key + ', keyError: ' + keyError + ', value: ' + controlErrors[keyError];
          });
      }
    });
  }

  callResourceUpdate() {
    const it = this;
    return (data) => {
      it.formCallsResourceUpdate.emit(data);
    };
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe());
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const fields = this.fields.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(fields));
        });

    }
  }

  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  createControl(config: FieldConfig) {
    const { x_disabled = false, x_validation = [], value, required = false } = config;
    const validation = required ? ['required', ...x_validation] : [...x_validation];
    return this.fb.control({ disabled: x_disabled, value },  validation.map(v => Validators[v]));
  }

  handleSubmit(event: Event = null) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.formSubmit.emit(this.value);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.fields = this.fields.map((item) => {
      if (item.name === name) {
        item.x_disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, {emitEvent: true});
  }
}
