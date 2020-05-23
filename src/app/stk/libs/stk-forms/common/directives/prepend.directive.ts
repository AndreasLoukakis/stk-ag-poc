import { Directive, Input, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[stkPrepend]'
})
export class PrependDirective implements OnInit {

  @Input() stkPrepend: string;

  get formControl() {
    return this.ngControl.control;
  }

  constructor( private ngControl: NgControl) { }

  ngOnInit() {
    this.blur();
  }

  @HostListener('blur')
  blur(): void {
    if (!this.stkPrepend || this.stkPrepend === null || !this.stkPrepend.length) { return; }
    const clean = this.formControl.value
      .replace(this.stkPrepend, '')
      .replace(this.stkPrepend.toLowerCase(), '')
      .replace(this.stkPrepend.toUpperCase(), '');
    if (clean.length) {
      this.formControl.setValue(`${this.stkPrepend}${clean}`);
    }
  }


}
