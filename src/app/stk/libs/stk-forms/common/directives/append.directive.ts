import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[stkAppend]'
})
export class AppendDirective implements OnInit {

  @Input() stkAppend: string;

  get formControl() {
    return this.ngControl.control;
  }

  constructor(private ngControl: NgControl) { }

  ngOnInit() {
    this.blur();
  }

  @HostListener('blur')
  blur(): void {
    if (!this.stkAppend || this.stkAppend === null || !this.stkAppend.length) { return ; }
    const clean = this.formControl.value
      .replace(this.stkAppend.toLowerCase(), '')
      .replace(this.stkAppend.toUpperCase(), '')
      .replace(this.stkAppend, '');
    if (clean.length) {
      this.formControl.setValue(`${clean}${this.stkAppend}`);
    }
  }

}
