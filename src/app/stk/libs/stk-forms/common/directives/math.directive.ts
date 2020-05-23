import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[stkMath]'
})
export class MathDirective {


  @Input() stkMath: string;

  get formControl() {
    return this.ngControl.control;
  }

  constructor( private ngControl: NgControl ) { }

  @HostListener('blur')
  onBlur(): void {
    // test the input has only digits and proper Math symbols
    const validRegex = /^[\d \+\-\*\/]+\d+$/;
    if (validRegex.test(this.formControl.value)) {
      try {
        // tslint:disable-next-line:no-eval
        const parsed = eval(this.formControl.value);
        this.formControl.setValue(parsed);
      } catch {
        console.error('Unable to parse ' + this.formControl.value);
      }
    }
  }
}
