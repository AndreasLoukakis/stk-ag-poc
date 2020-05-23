import {Injectable} from '@angular/core';
import {StkCalendar} from './stk-calendar';
import {StkDatepicker} from '../stk-datepicker.component';
import {Key} from './utils/key';

/**
 * A service that represents the keyboard navigation.
 *
 * Default keyboard shortcuts [are documented in the overview](#/components/datepicker/overview#keyboard-shortcuts)
 *
 * @since 5.2.0
 */
@Injectable({providedIn: 'root'})
export class StkDatepickerKeyboardService {
  /**
   * Processes a keyboard event.
   */
  processKey(event: KeyboardEvent, datepicker: StkDatepicker, calendar: StkCalendar) {
    const state = datepicker.state;
    // tslint:disable-next-line:deprecation
    switch (event.which) {
      case Key.PageUp:
        datepicker.focusDate(calendar.getPrev(state.focusedDate, event.shiftKey ? 'y' : 'm', 1));
        break;
      case Key.PageDown:
        datepicker.focusDate(calendar.getNext(state.focusedDate, event.shiftKey ? 'y' : 'm', 1));
        break;
      case Key.End:
        datepicker.focusDate(event.shiftKey ? state.maxDate : state.lastDate);
        break;
      case Key.Home:
        datepicker.focusDate(event.shiftKey ? state.minDate : state.firstDate);
        break;
      case Key.ArrowLeft:
        datepicker.focusDate(calendar.getPrev(state.focusedDate, 'd', 1));
        break;
      case Key.ArrowUp:
        datepicker.focusDate(calendar.getPrev(state.focusedDate, 'd', calendar.getDaysPerWeek()));
        break;
      case Key.ArrowRight:
        datepicker.focusDate(calendar.getNext(state.focusedDate, 'd', 1));
        break;
      case Key.ArrowDown:
        datepicker.focusDate(calendar.getNext(state.focusedDate, 'd', calendar.getDaysPerWeek()));
        break;
      case Key.Enter:
      case Key.Space:
        datepicker.focusSelect();
        break;
      default:
        return;
    }
    event.preventDefault();
    event.stopPropagation();
  }
}
