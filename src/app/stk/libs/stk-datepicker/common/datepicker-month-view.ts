import {Component, Input, TemplateRef, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {MonthViewModel, DayViewModel} from './datepicker-view-model';
import {StkDate} from './stk-date';
import {StkDatepickerI18n} from './datepicker-i18n';
import {DayTemplateContext} from './datepicker-day-template-context';

@Component({
  selector: 'stk-datepicker-month-view',
  /* tslint:disable no-host-metadata-property */
  /* tslint:disable object-literal-key-quotes */
  host: {'role': 'grid'},
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./datepicker-month-view.scss'],
  template: `
    <div *ngIf="showWeekdays" class="stk-dp-week stk-dp-weekdays" role="row">
      <div *ngIf="showWeekNumbers" class="stk-dp-weekday stk-dp-showweek"></div>
      <div *ngFor="let w of month.weekdays" class="stk-dp-weekday small" role="columnheader">
        {{ i18n.getWeekdayShortName(w) }}
      </div>
    </div>
    <ng-template ngFor let-week [ngForOf]="month.weeks">
      <div *ngIf="!week.collapsed" class="stk-dp-week" role="row">
        <div *ngIf="showWeekNumbers" class="stk-dp-week-number small text-muted">{{ i18n.getWeekNumerals(week.number) }}</div>
        <div *ngFor="let day of week.days" (click)="doSelect(day); $event.preventDefault()" class="stk-dp-day" role="gridcell"
          [class.disabled]="day.context.disabled"
          [tabindex]="day.tabindex"
          [class.hidden]="day.hidden"
          [class.stk-dp-today]="day.context.today"
          [attr.aria-label]="day.ariaLabel">
          <ng-template [ngIf]="!day.hidden">
            <ng-template [ngTemplateOutlet]="dayTemplate" [ngTemplateOutletContext]="day.context"></ng-template>
          </ng-template>
        </div>
      </div>
    </ng-template>
  `
})
/* tslint:disable component-class-suffix */
export class StkDatepickerMonthView {
  @Input() dayTemplate: TemplateRef<DayTemplateContext>;
  @Input() month: MonthViewModel;
  @Input() showWeekdays;
  @Input() showWeekNumbers;
  /* tslint:disable no-output-native */
  @Output() select = new EventEmitter<StkDate>();

  constructor(public i18n: StkDatepickerI18n) {}

  doSelect(day: DayViewModel) {
    if (!day.context.disabled && !day.hidden) {
      this.select.emit(day.date);
    }
  }
}
