import { Directive, Input, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FieldConfig } from '../interfaces/field-config';
import { StkValidators } from '../stk-validators';
import { Validators } from '@angular/forms';

@Directive({
  selector: '[stkValidations]'
})
export class ValidationsDirective implements AfterContentInit {

  @Input() stkValidations: string[] = [];
  @Input() config: FieldConfig;
  @Input() group: FormGroup;

  constructor() { }

  ngAfterContentInit() {
    this.config.x_validation = this.config.x_validation || [];
    // this.stkValidations.map(v => this.config.x_validation.push(v));
    if (this.group.controls[this.config.name] !== undefined ) {
      const newValidators = [];
      this.stkValidations.map(v => {
        const vArray = v.split(':');
        if (StkValidators[vArray[0]]) {
          if (typeof StkValidators[vArray[0]]() === 'function') {
            if (!vArray[1]) {
              throw new Error('Validator parameter was not defined.');
            }
            newValidators.push(StkValidators[vArray[0]](vArray[1]));
          } else {
            newValidators.push(StkValidators[vArray[0]]);
          }
        } else if (Validators[vArray[0]]) {
          if (typeof Validators[vArray[0]]() === 'function') {
            if (!vArray[1]) {
              throw new Error('Validator parameter was not defined.');
            }
            newValidators.push(Validators[vArray[0]](vArray[1]));
          } else {
            newValidators.push(Validators[vArray[0]]);
          }
        }
      });

      const ctrl = this.group.controls[this.config.name];
      ctrl.setValidators([ctrl.validator, ...newValidators]);
    }

  }

}
