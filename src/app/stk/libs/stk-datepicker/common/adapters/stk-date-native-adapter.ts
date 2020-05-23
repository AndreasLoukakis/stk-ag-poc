import {Injectable} from '@angular/core';
import {StkDateAdapter} from './Stk-date-adapter';
import {StkDateStruct} from '../Stk-date-struct';
import {isInteger} from '../utils/util';

/**
 * [`StkDateAdapter`](#/components/datepicker/api#StkDateAdapter) implementation that uses
 * native javascript dates as a user date model.
 */
@Injectable()
export class StkDateNativeAdapter extends StkDateAdapter<Date> {
  /**
   * Converts a native `Date` to a `StkDateStruct`.
   */
  fromModel(date: Date): StkDateStruct {
    return (date instanceof Date && !isNaN(date.getTime())) ? this._fromNativeDate(date) : null;
  }

  /**
   * Converts a `StkDateStruct` to a native `Date`.
   */
  toModel(date: StkDateStruct): Date {
    return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day) ? this._toNativeDate(date) :
                                                                                          null;
  }

  protected _fromNativeDate(date: Date): StkDateStruct {
    return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
  }

  protected _toNativeDate(date: StkDateStruct): Date {
    const jsDate = new Date(date.year, date.month - 1, date.day, 12);
    // avoid 30 -> 1930 conversion
    jsDate.setFullYear(date.year);
    return jsDate;
  }
}
