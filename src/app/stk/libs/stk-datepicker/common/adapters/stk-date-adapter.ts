import {Injectable} from '@angular/core';
import {StkDateStruct} from '../stk-date-struct';
import {isInteger} from '../utils/util';

export function STK_DATEPICKER_DATE_ADAPTER_FACTORY() {
  return new StkDateStructAdapter();
}

/**
 * An abstract service that does the conversion between the internal datepicker `StkDateStruct` model and
 * any provided user date model `D`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding datepicker to a form control,
 * ex. `[(ngModel)]="userDateModel"`. Here `userDateModel` can be of any type.
 *
 * The default datepicker implementation assumes we use `StkDateStruct` as a user model.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details
 * and the [custom adapter demo](#/components/datepicker/examples#adapter) for an example.
 */
@Injectable({providedIn: 'root', useFactory: STK_DATEPICKER_DATE_ADAPTER_FACTORY})
export abstract class StkDateAdapter<D> {
  /**
   * Converts a user-model date of type `D` to an `StkDateStruct` for internal use.
   */
  abstract fromModel(value: D): StkDateStruct;

  /**
   * Converts an internal `StkDateStruct` date to a user-model date of type `D`.
   */
  abstract toModel(date: StkDateStruct): D;
}

@Injectable()
export class StkDateStructAdapter extends StkDateAdapter<StkDateStruct> {
  /**
   * Converts a StkDateStruct value into StkDateStruct value
   */
  fromModel(date: StkDateStruct): StkDateStruct {
    return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
        {year: date.year, month: date.month, day: date.day} :
        null;
  }

  /**
   * Converts a StkDateStruct value into StkDateStruct value
   */
  toModel(date: StkDateStruct): StkDateStruct {
    return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
        {year: date.year, month: date.month, day: date.day} :
        null;
  }
}
