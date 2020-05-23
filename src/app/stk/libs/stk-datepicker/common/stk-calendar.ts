import {StkDate} from './stk-date';
import {Injectable} from '@angular/core';
import {isInteger} from './utils/util';

export function fromJSDate(jsDate: Date) {
  return new StkDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
}
export function toJSDate(date: StkDate) {
  const jsDate = new Date(date.year, date.month - 1, date.day, 12);
  // this is done avoid 30 -> 1930 conversion
  if (!isNaN(jsDate.getTime())) {
    jsDate.setFullYear(date.year);
  }
  return jsDate;
}

export type StkPeriod = 'y' | 'm' | 'd';

export function STK_DATEPICKER_CALENDAR_FACTORY() {
  return new StkCalendarGregorian();
}

/**
 * A service that represents the calendar used by the datepicker.
 *
 * The default implementation uses the Gregorian calendar. You can inject it in your own
 * implementations if necessary to simplify `StkDate` calculations.
 */
@Injectable({providedIn: 'root', useFactory: STK_DATEPICKER_CALENDAR_FACTORY})
export abstract class StkCalendar {
  /**
   * Returns the number of days per week.
   */
  abstract getDaysPerWeek(): number;

  /**
   * Returns an array of months per year.
   *
   * With default calendar we use ISO 8601 and return [1, 2, ..., 12];
   */
  abstract getMonths(year?: number): number[];

  /**
   * Returns the number of weeks per month.
   */
  abstract getWeeksPerMonth(): number;

  /**
   * Returns the weekday number for a given day.
   *
   * With the default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
   */
  abstract getWeekday(date: StkDate): number;

  /**
   * Adds a number of years, months or days to a given date.
   *
   * * `period` can be `y`, `m` or `d` and defaults to day.
   * * `number` defaults to 1.
   *
   * Always returns a new date.
   */
  abstract getNext(date: StkDate, period?: StkPeriod, num?: number): StkDate;

  /**
   * Subtracts a number of years, months or days from a given date.
   *
   * * `period` can be `y`, `m` or `d` and defaults to day.
   * * `number` defaults to 1.
   *
   * Always returns a new date.
   */
  abstract getPrev(date: StkDate, period?: StkPeriod, num?: number): StkDate;

  /**
   * Returns the week number for a given week.
   */
  abstract getWeekNumber(week: readonly StkDate[], firstDayOfWeek: number): number;

  /**
   * Returns the today's date.
   */
  abstract getToday(): StkDate;

  /**
   * Checks if a date is valid in the current calendar.
   */
  abstract isValid(date: StkDate): boolean;
}

@Injectable()
export class StkCalendarGregorian extends StkCalendar {
  getDaysPerWeek() { return 7; }

  getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }

  getWeeksPerMonth() { return 6; }

  getNext(date: StkDate, period: StkPeriod = 'd', num = 1) {
    const jsDate = toJSDate(date);
    let checkMonth = true;
    let expectedMonth = jsDate.getMonth();

    switch (period) {
      case 'y':
        jsDate.setFullYear(jsDate.getFullYear() + num);
        break;
      case 'm':
        expectedMonth += num;
        jsDate.setMonth(expectedMonth);
        expectedMonth = expectedMonth % 12;
        if (expectedMonth < 0) {
          expectedMonth = expectedMonth + 12;
        }
        break;
      case 'd':
        jsDate.setDate(jsDate.getDate() + num);
        checkMonth = false;
        break;
      default:
        return date;
    }

    if (checkMonth && jsDate.getMonth() !== expectedMonth) {
      // this means the destination month has less days than the initial month
      // let's go back to the end of the previous month:
      jsDate.setDate(0);
    }

    return fromJSDate(jsDate);
  }

  getPrev(date: StkDate, period: StkPeriod = 'd', num = 1) { return this.getNext(date, period, -num); }

  getWeekday(date: StkDate) {
    const jsDate = toJSDate(date);
    const day = jsDate.getDay();
    // in JS Date Sun=0, in ISO 8601 Sun=7
    return day === 0 ? 7 : day;
  }

  getWeekNumber(week: readonly StkDate[], firstDayOfWeek: number) {
    // in JS Date Sun=0, in ISO 8601 Sun=7
    if (firstDayOfWeek === 7) {
      firstDayOfWeek = 0;
    }

    const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
    const date = week[thursdayIndex];

    const jsDate = toJSDate(date);
    jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7));  // Thursday
    const time = jsDate.getTime();
    jsDate.setMonth(0);  // Compare with Jan 1
    jsDate.setDate(1);
    return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
  }

  getToday(): StkDate { return fromJSDate(new Date()); }

  isValid(date: StkDate): boolean {
    if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
      return false;
    }

    // year 0 doesn't exist in Gregorian calendar
    if (date.year === 0) {
      return false;
    }

    const jsDate = toJSDate(date);

    return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === date.year && jsDate.getMonth() + 1 === date.month &&
        jsDate.getDate() === date.day;
  }
}
