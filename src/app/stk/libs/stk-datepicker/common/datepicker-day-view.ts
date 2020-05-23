import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {StkDate} from './stk-date';
import {StkDatepickerI18n} from './datepicker-i18n';

@Component({
  /* tslint:disable component-selector */
  selector: '[stkDatepickerDayView]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./datepicker-day-view.scss'],
  /* tslint:disable object-literal-key-quotes no-host-metadata-property */
  host: {
    'class': 'btn-light',
    '[class.bg-primary]': 'selected',
    '[class.text-white]': 'selected',
    '[class.text-muted]': 'isMuted()',
    '[class.outside]': 'isMuted()',
    '[class.active]': 'focused'
  },
  template: `{{ i18n.getDayNumerals(date) }}`
})
/* tslint:disable component-class-suffix */
export class StkDatepickerDayView {
  @Input() currentMonth: number;
  @Input() date: StkDate;
  @Input() disabled: boolean;
  @Input() focused: boolean;
  @Input() selected: boolean;

  constructor(public i18n: StkDatepickerI18n) {}

  isMuted() { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); }
}
