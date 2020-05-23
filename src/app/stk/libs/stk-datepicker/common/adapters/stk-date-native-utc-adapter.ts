import {Injectable} from '@angular/core';
import {StkDateStruct} from '../Stk-date-struct';
import {StkDateNativeAdapter} from './Stk-date-native-adapter';

/**
 * Same as [`StkDateNativeAdapter`](#/components/datepicker/api#StkDateNativeAdapter), but with UTC dates.
 *
 * @since 3.2.0
 */
@Injectable()
export class StkDateNativeUTCAdapter extends StkDateNativeAdapter {
  protected _fromNativeDate(date: Date): StkDateStruct {
    return {year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate()};
  }

  protected _toNativeDate(date: StkDateStruct): Date {
    const jsDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
    // avoid 30 -> 1930 conversion
    jsDate.setUTCFullYear(date.year);
    return jsDate;
  }
}
