import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import { NgControl } from '@angular/forms';
import { TextBehavior } from '../interfaces';

@Directive({
  selector: 'input[stkChangeCase], [stkChangeCase] > div > input'
})
export class ChangeCaseDirective implements OnInit {

  @Input() stkChangeCase: TextBehavior;

  get formControl() {
    return this.ngControl.control;
  }

  constructor(
    private ngControl: NgControl,
    private el: ElementRef<HTMLInputElement>
  ) { }

  ngOnInit() {
    this.onInputChange();
  }

  @HostListener('input') onInputChange() {
    if (this.stkChangeCase) {
      const cp = this.el.nativeElement?.selectionStart;
      this.formControl.setValue(this.transformTo(this.stkChangeCase, this.formControl.value));
      if (this.el.nativeElement.getAttribute('type') === 'text') {
        this.el.nativeElement.setSelectionRange(cp, cp);
      }
    }
  }

  private transformTo(what: TextBehavior, val: string) {

    const map = {
      upper: val.toUpperCase(),
      lower: val.toLowerCase(),
      firstUp: `${val.charAt(0).toUpperCase()}${val.slice(1).toLowerCase()}`
    };

    return map[what] ? map[what] : val;
  }
}
