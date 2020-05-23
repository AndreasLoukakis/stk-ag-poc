import {fromEvent, merge, Subject} from 'rxjs';
import {filter, take, takeUntil} from 'rxjs/operators';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {StkCalendar} from './common/stk-calendar';
import {StkDate} from './common/stk-date';
import {DatepickerServiceInputs, StkDatepickerService} from './common/datepicker-service';
import {StkDatepickerKeyboardService} from './common/datepicker-keyboard-service';
import {DatepickerViewModel, NavigationEvent} from './common/datepicker-view-model';
import {DayTemplateContext} from './common/datepicker-day-template-context';
import {StkDatepickerConfig} from './common/datepicker-config';
import {StkDateAdapter} from './common/adapters/stk-date-adapter';
import {StkDateStruct} from './common/stk-date-struct';
import {StkDatepickerI18n} from './common/datepicker-i18n';
import {isChangedDate, isChangedMonth} from './common/utils/tools';
import {hasClassName} from './common/utils/util';

const STK_DATEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StkDatepicker),
  multi: true
};

/**
 * An event emitted right before the navigation happens and the month displayed by the datepicker changes.
 */
export interface StkDatepickerNavigateEvent {
  /**
   * The currently displayed month.
   */
  current: {year: number, month: number};

  /**
   * The month we're navigating to.
   */
  next: {year: number, month: number};

  /**
   * Calling this function will prevent navigation from happening.
   *
   * @since 4.1.0
   */
  preventDefault: () => void;
}

/**
 * An interface that represents the readonly public state of the datepicker.
 *
 * Accessible via the `datepicker.state` getter
 *
 * @since 5.2.0
 */
export interface StkDatepickerState {
  /**
   * The earliest date that can be displayed or selected
   */
  readonly minDate: StkDate;

  /**
   * The latest date that can be displayed or selected
   */
  readonly maxDate: StkDate;

  /**
   * The first visible date of currently displayed months
   */
  readonly firstDate: StkDate;

  /**
   * The last visible date of currently displayed months
   */
  readonly lastDate: StkDate;

  /**
   * The date currently focused by the datepicker
   */
  readonly focusedDate: StkDate;
}

/**
 * A highly configurable component that helps you with selecting calendar dates.
 *
 * `StkDatepicker` is meant to be displayed inline on a page or put inside a popup.
 */
@Component({
  exportAs: 'stkDatepicker',
  selector: 'stk-datepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./stk-datepicker.scss'],
  templateUrl: './stk-datepicker.html',
  providers: [STK_DATEPICKER_VALUE_ACCESSOR, StkDatepickerService]
})
/* tslint:disable component-class-suffix */
export class StkDatepicker implements OnDestroy,
    OnChanges, OnInit, AfterViewInit, ControlValueAccessor {
  model: DatepickerViewModel;
  /* tslint:disable variable-name */
  @ViewChild('months', {static: true}) private _monthsEl: ElementRef<HTMLElement>;
  /* tslint:disable variable-name */
  private _controlValue: StkDate;
  private _destroyed$ = new Subject<void>();
  /* tslint:disable no-angle-bracket-type-assertion */
  private _publicState: StkDatepickerState = <any> {};

  /**
   * The reference to a custom template for the day.
   *
   * Allows to completely override the way a day 'cell' in the calendar is displayed.
   *
   * See [`DayTemplateContext`](#/components/datepicker/api#DayTemplateContext) for the data you get inside.
   */
  @Input() dayTemplate: TemplateRef<DayTemplateContext>;

  /**
   * The callback to pass any arbitrary data to the template cell via the
   * [`DayTemplateContext`](#/components/datepicker/api#DayTemplateContext)'s `data` parameter.
   *
   * `current` is the month that is currently displayed by the datepicker.
   *
   * @since 3.3.0
   */
  @Input() dayTemplateData: (date: StkDate, current: {year: number, month: number}) => any;

  /**
   * The number of months to display.
   */
  @Input() displayMonths: number;

  /**
   * The first day of the week.
   *
   * With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun.
   */
  @Input() firstDayOfWeek: number;

  /**
   * The reference to the custom template for the datepicker footer.
   *
   * @since 3.3.0
   */
  @Input() footerTemplate: TemplateRef<any>;

  /**
   * The callback to mark some dates as disabled.
   *
   * It is called for each new date when navigating to a different month.
   *
   * `current` is the month that is currently displayed by the datepicker.
   */
  @Input() markDisabled: (date: StkDate, current: {year: number, month: number}) => boolean;

  /**
   * The latest date that can be displayed or selected.
   *
   * If not provided, 'year' select box will display 10 years after the current month.
   */
  @Input() maxDate: StkDateStruct;

  /**
   * The earliest date that can be displayed or selected.
   *
   * If not provided, 'year' select box will display 10 years before the current month.
   */
  @Input() minDate: StkDateStruct;

  /**
   * Navigation type.
   *
   * * `"select"` - select boxes for month and navigation arrows
   * * `"arrows"` - only navigation arrows
   * * `"none"` - no navigation visible at all
   */
  @Input() navigation: 'select' | 'arrows' | 'none';

  /**
   * The way of displaying days that don't belong to the current month.
   *
   * * `"visible"` - days are visible
   * * `"hidden"` - days are hidden, white space preserved
   * * `"collapsed"` - days are collapsed, so the datepicker height might change between months
   *
   * For the 2+ months view, days in between months are never shown.
   */
  @Input() outsideDays: 'visible' | 'collapsed' | 'hidden';

  /**
   * If `true`, weekdays will be displayed.
   */
  @Input() showWeekdays: boolean;

  /**
   * If `true`, week numbers will be displayed.
   */
  @Input() showWeekNumbers: boolean;

  /**
   * The date to open calendar with.
   *
   * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
   * If nothing or invalid date is provided, calendar will open with current month.
   *
   * You could use `navigateTo(date)` method as an alternative.
   */
  @Input() startDate: {year: number, month: number, day?: number};

  /**
   * An event emitted right before the navigation happens and displayed month changes.
   *
   * See [`StkDatepickerNavigateEvent`](#/components/datepicker/api#StkDatepickerNavigateEvent) for the payload info.
   */
  @Output() navigate = new EventEmitter<StkDatepickerNavigateEvent>();

  /**
   * An event emitted when user selects a date using keyboard or mouse.
   *
   * The payload of the event is currently selected `StkDate`.
   *
   * @since 5.2.0
   */
  @Output() dateSelect = new EventEmitter<StkDate>();

  /**
   * An event emitted when user selects a date using keyboard or mouse.
   *
   * The payload of the event is currently selected `StkDate`.
   *
   * Please use 'dateSelect' output instead, this will be deprecated in version 6.0 due to collision with native
   * 'select' event.
   */
  /* tslint:disable no-output-native */
  @Output() select = this.dateSelect;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(
      private _service: StkDatepickerService, private _calendar: StkCalendar, public i18n: StkDatepickerI18n,
      config: StkDatepickerConfig, private _keyboardService: StkDatepickerKeyboardService, cd: ChangeDetectorRef,
      private _elementRef: ElementRef<HTMLElement>, private _stkDateAdapter: StkDateAdapter<any>,
      private _ngZone: NgZone) {
    ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
     'maxDate', 'navigation', 'outsideDays', 'showWeekdays', 'showWeekNumbers', 'startDate']
        .forEach(input => this[input] = config[input]);

    _service.dateSelect$.pipe(takeUntil(this._destroyed$)).subscribe(date => { this.dateSelect.emit(date); });

    _service.model$.pipe(takeUntil(this._destroyed$)).subscribe(model => {
      const newDate = model.firstDate;
      const oldDate = this.model ? this.model.firstDate : null;

      // update public state
      this._publicState = {
        maxDate: model.maxDate,
        minDate: model.minDate,
        firstDate: model.firstDate,
        lastDate: model.lastDate,
        focusedDate: model.focusDate
      };

      let navigationPrevented = false;
      // emitting navigation event if the first month changes
      if (!newDate.equals(oldDate)) {
        this.navigate.emit({
          current: oldDate ? {year: oldDate.year, month: oldDate.month} : null,
          next: {year: newDate.year, month: newDate.month},
          preventDefault: () => navigationPrevented = true
        });

        // can't prevent the very first navigation
        if (navigationPrevented && oldDate !== null) {
          this._service.open(oldDate);
          return;
        }
      }

      const newSelectedDate = model.selectedDate;
      const newFocusedDate = model.focusDate;
      const oldFocusedDate = this.model ? this.model.focusDate : null;

      this.model = model;

      // handling selection change
      if (isChangedDate(newSelectedDate, this._controlValue)) {
        this._controlValue = newSelectedDate;
        this.onTouched();
        this.onChange(this._stkDateAdapter.toModel(newSelectedDate));
      }

      // handling focus change
      if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
        this.focus();
      }

      cd.markForCheck();
    });
  }

  /**
   *  Returns the readonly public state of the datepicker
   *
   * @since 5.2.0
   */
  get state(): StkDatepickerState { return this._publicState; }

  /**
   *  Focuses on given date.
   */
  focusDate(date: StkDateStruct): void { this._service.focus(StkDate.from(date)); }

  /**
   *  Selects focused date.
   */
  focusSelect(): void { this._service.focusSelect(); }

  focus() {
    this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
      const elementToFocus =
          this._elementRef.nativeElement.querySelector<HTMLDivElement>('div.stk-dp-day[tabindex="0"]');
      if (elementToFocus) {
        elementToFocus.focus();
      }
    });
  }

  /**
   * Navigates to the provided date.
   *
   * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
   * If nothing or invalid date provided calendar will open current month.
   *
   * Use the `[startDate]` input as an alternative.
   */
  navigateTo(date?: {year: number, month: number, day?: number}) {
    this._service.open(StkDate.from(date ? date.day ? date as StkDateStruct : {...date, day: 1} : null));
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      const focusIns$ = fromEvent<FocusEvent>(this._monthsEl.nativeElement, 'focusin');
      const focusOuts$ = fromEvent<FocusEvent>(this._monthsEl.nativeElement, 'focusout');
      const {nativeElement} = this._elementRef;

      // we're changing 'focusVisible' only when entering or leaving months view
      // and ignoring all focus events where both 'target' and 'related' target are day cells
      merge(focusIns$, focusOuts$)
          .pipe(
              filter(
                  ({target, relatedTarget}) =>
                      !(hasClassName(target, 'stk-dp-day') && hasClassName(relatedTarget, 'stk-dp-day') &&
                        nativeElement.contains(target as Node) && nativeElement.contains(relatedTarget as Node))),
              takeUntil(this._destroyed$))
          .subscribe(({type}) => this._ngZone.run(() => this._service.set({focusVisible: type === 'focusin'})));
    });
  }

  ngOnDestroy() { this._destroyed$.next(); }

  ngOnInit() {
    if (this.model === undefined) {
      const inputs: DatepickerServiceInputs = {};
      ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
       'outsideDays']
          .forEach(name => inputs[name] = this[name]);
      this._service.set(inputs);

      this.navigateTo(this.startDate);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const inputs: DatepickerServiceInputs = {};
    ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
     'outsideDays']
        .filter(name => name in changes)
        .forEach(name => inputs[name] = this[name]);
    this._service.set(inputs);

    if ('startDate' in changes) {
      const {currentValue, previousValue} = changes.startDate;
      if (isChangedMonth(previousValue, currentValue)) {
        this.navigateTo(this.startDate);
      }
    }
  }

  onDateSelect(date: StkDate) {
    this._service.focus(date);
    this._service.select(date, {emitEvent: true});
  }

  onKeyDown(event: KeyboardEvent) { this._keyboardService.processKey(event, this, this._calendar); }

  onNavigateDateSelect(date: StkDate) { this._service.open(date); }

  onNavigateEvent(event: NavigationEvent) {
    switch (event) {
      case NavigationEvent.PREV:
        this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
        break;
      case NavigationEvent.NEXT:
        this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
        break;
    }
  }

  registerOnChange(fn: (value: any) => any): void { this.onChange = fn; }

  registerOnTouched(fn: () => any): void { this.onTouched = fn; }

  setDisabledState(disabled: boolean) { this._service.set({disabled}); }

  writeValue(value) {
    this._controlValue = StkDate.from(this._stkDateAdapter.fromModel(value));
    this._service.select(this._controlValue);
  }
}
