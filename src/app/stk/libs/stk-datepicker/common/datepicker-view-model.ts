import { StkDate } from './stk-date';
import { StkDateStruct } from './stk-date-struct';
import { DayTemplateContext } from './datepicker-day-template-context';

export type STKMarkDisabled = (date: StkDateStruct, current: {year: number, month: number}) => boolean;
export type STKDayTemplateData = (date: StkDateStruct, current: {year: number, month: number}) => any;
/*tslint:disable interface-over-type-literal */
export type DayViewModel = {
  date: StkDate,
  context: DayTemplateContext,
  tabindex: number,
  ariaLabel: string,
  hidden: boolean
};

export type WeekViewModel = {
  number: number,
  days: DayViewModel[],
  collapsed: boolean
};

export type MonthViewModel = {
  firstDate: StkDate,
  lastDate: StkDate,
  number: number,
  year: number,
  weeks: WeekViewModel[],
  weekdays: number[]
};

// clang-format off
export type DatepickerViewModel = {
  dayTemplateData?: STKDayTemplateData,
  disabled: boolean,
  displayMonths: number,
  firstDate?: StkDate,
  firstDayOfWeek: number,
  focusDate?: StkDate,
  focusVisible: boolean,
  lastDate?: StkDate,
  markDisabled?: STKMarkDisabled,
  maxDate?: StkDate,
  minDate?: StkDate,
  months: MonthViewModel[],
  navigation: 'select' | 'arrows' | 'none',
  outsideDays: 'visible' | 'collapsed' | 'hidden',
  prevDisabled: boolean,
  nextDisabled: boolean,
  selectBoxes: {
    years: number[],
    months: number[]
  },
  selectedDate: StkDate
};
// clang-format on

export enum NavigationEvent {
  PREV,
  NEXT
}
