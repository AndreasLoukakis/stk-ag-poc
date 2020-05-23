import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {NavigationEvent, MonthViewModel} from './datepicker-view-model';
import {StkDate} from './stk-date';
import {StkDatepickerI18n} from './datepicker-i18n';

@Component({
  selector: 'stk-datepicker-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./datepicker-navigation.scss'],
  template: `
    <div class="stk-dp-arrow">
      <button type="button" class="pf-c-button pf-m-link stk-dp-arrow-btn" (click)="onClickPrev($event)" [disabled]="prevDisabled"
              i18n-aria-label="@@stk.datepicker.previous-month" aria-label="Previous month"
              i18n-title="@@stk.datepicker.previous-month" title="Previous month">
        <i class="fas fa-chevron-left"></i>
      </button>
    </div>
    <stk-datepicker-navigation-select *ngIf="showSelect" class="stk-dp-navigation-select"
      [date]="date"
      [disabled] = "disabled"
      [months]="selectBoxes.months"
      [years]="selectBoxes.years"
      (select)="select.emit($event)">
    </stk-datepicker-navigation-select>

    <ng-template *ngIf="!showSelect" ngFor let-month [ngForOf]="months" let-i="index">
      <div class="stk-dp-arrow" *ngIf="i > 0"></div>
      <div class="stk-dp-month-name">
        {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}
      </div>
      <div class="stk-dp-arrow" *ngIf="i !== months.length - 1"></div>
    </ng-template>
    <div class="stk-dp-arrow right">
      <button type="button" class="pf-c-button pf-m-link stk-dp-arrow-btn" (click)="onClickNext($event)" [disabled]="nextDisabled"
              i18n-aria-label="@@stk.datepicker.next-month" aria-label="Next month"
              i18n-title="@@stk.datepicker.next-month" title="Next month">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    `
})
/* tslint:disable component-class-suffix */
export class StkDatepickerNavigation {
  navigation = NavigationEvent;

  @Input() date: StkDate;
  @Input() disabled: boolean;
  @Input() months: MonthViewModel[] = [];
  @Input() showSelect: boolean;
  @Input() prevDisabled: boolean;
  @Input() nextDisabled: boolean;
  @Input() selectBoxes: {years: number[], months: number[]};

  @Output() navigate = new EventEmitter<NavigationEvent>();
  /* tslint:disable no-output-native */
  @Output() select = new EventEmitter<StkDate>();

  constructor(public i18n: StkDatepickerI18n) {}

  onClickPrev(event: MouseEvent) {
    (event.currentTarget as HTMLElement).focus();
    this.navigate.emit(this.navigation.PREV);
  }

  onClickNext(event: MouseEvent) {
    (event.currentTarget as HTMLElement).focus();
    this.navigate.emit(this.navigation.NEXT);
  }
}
