import { moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { action } from '@storybook/addon-actions';

import {  ErrorContainerComponent } from 'stk-forms';
import { InputCheckboxComponent } from './input-checkbox.component';

import changelogmd from './../../../../changelog.md';
import notes from './notes.md';

import '@patternfly/patternfly/patternfly.css';
import '@patternfly/patternfly/patternfly-addons.css';

const formgroup: FormGroup = new FormGroup({
  fooModel: new FormControl(),
  fooModelReq: new FormControl('', Validators.required),
  fooModelReqB: new FormControl('', Validators.required),
  fooModelReqC: new FormControl('', Validators.required)
});

const config = {
  title: 'Loan Amount',
  required: false,
  name: 'fooModel',
  x_disabled: false,
  x_placeholder: '1101101',
};

export default {
  title: 'Form/Form Elements/Checkbox',
  component: InputCheckboxComponent,
  decorators: [
    moduleMetadata({
      declarations: [InputCheckboxComponent, ErrorContainerComponent],
      imports: [ReactiveFormsModule]
    })
  ],
  parameters: {
    notes: {
      Usage: notes,
      Changelog: changelogmd,
    },
  }
};

export const CheckboxInput = () => ({
  component: InputCheckboxComponent,
  props: {
    standardInputConfig: config,
    configReadonly: { ...config, x_readonly: true },
    configRequired: { ...config, name: 'fooModelReq' },
    formgroup,
    onClick: e => {
      action('clicked at ')(e.target);
    }
  },
  template: `
        <div style="display: flex; flex-flow: row wrap">
          <div style="padding: 1rem; flex: 1 50%;">
            <small>Standard</small>
            <stk-checkbox-input (click)="onClick($event)" [config]="standardInputConfig" [group]="formgroup"></stk-checkbox-input>
          </div>
          <div style="padding: 1rem; flex: 1 50%;">
            <small>Disabled</small>
            <stk-checkbox-input (click)="onClick($event)" [config]="configReadonly" [group]="formgroup"></stk-checkbox-input>
          </div>

          <div style="padding: 1rem; flex: 1 50%;">
            <small>Reverse</small>
            <stk-checkbox-input (click)="onClick($event)"
              [reverseLabel]="true" [config]="configRequired" [group]="formgroup"></stk-checkbox-input>
          </div>

        </div>
        `
});
