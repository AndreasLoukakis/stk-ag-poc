import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import {StkDate} from './stk-date';
import {toInteger} from './utils/util';
import {StkDatepickerI18n} from './datepicker-i18n';

@Component({
  selector: 'stk-datepicker-navigation-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./datepicker-navigation-select.scss'],
  template: `
    <select #month
      [disabled]="disabled"
      class="custom-select pf-c-form-control"
      i18n-aria-label="@@stk.datepicker.select-month" aria-label="Select month"
      i18n-title="@@stk.datepicker.select-month" title="Select month"
      (change)="changeMonth($event.target.value)">
        <option *ngFor="let m of months" [attr.aria-label]="i18n.getMonthFullName(m, date?.year)"
                [value]="m">{{ i18n.getMonthShortName(m, date?.year) }}</option>
    </select><select #year
      [disabled]="disabled"
      class="custom-select pf-c-form-control"
      i18n-aria-label="@@stk.datepicker.select-year" aria-label="Select year"
      i18n-title="@@stk.datepicker.select-year" title="Select year"
      (change)="changeYear($event.target.value)">
        <option *ngFor="let y of years" [value]="y">{{ i18n.getYearNumerals(y) }}</option>
    </select>
  `
})
/* tslint:disable component-class-suffix */
export class StkDatepickerNavigationSelect implements AfterViewChecked {
  @Input() date: StkDate;
  @Input() disabled: boolean;
  @Input() months: number[];
  @Input() years: number[];
  /* tslint:disable no-output-native */
  @Output() select = new EventEmitter<StkDate>();

  @ViewChild('month', {static: true, read: ElementRef}) monthSelect: ElementRef;
  @ViewChild('year', {static: true, read: ElementRef}) yearSelect: ElementRef;
  /* tslint:disable variable-name */
  private _month = -1;
  private _year = -1;

  constructor(public i18n: StkDatepickerI18n, private _renderer: Renderer2) {}

  changeMonth(month: string) { this.select.emit(new StkDate(this.date.year, toInteger(month), 1)); }

  changeYear(year: string) { this.select.emit(new StkDate(toInteger(year), this.date.month, 1)); }

  ngAfterViewChecked() {
    if (this.date) {
      if (this.date.month !== this._month) {
        this._month = this.date.month;
        this._renderer.setProperty(this.monthSelect.nativeElement, 'value', this._month);
      }
      if (this.date.year !== this._year) {
        this._year = this.date.year;
        this._renderer.setProperty(this.yearSelect.nativeElement, 'value', this._year);
      }
    }
  }
}
