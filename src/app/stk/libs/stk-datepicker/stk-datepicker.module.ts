import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StkDatepicker } from './stk-datepicker.component';
import { StkInputDatepicker } from './common/datepicker-input';
import { StkDatepickerMonthView } from './common/datepicker-month-view';
import { StkDatepickerNavigation } from './common/datepicker-navigation';
import { StkDatepickerNavigationSelect } from './common/datepicker-navigation-select';
import { StkDatepickerDayView } from './common/datepicker-day-view';



@NgModule({
  declarations: [StkDatepicker, StkInputDatepicker,
    StkDatepickerMonthView, StkDatepickerNavigation, StkDatepickerNavigationSelect, StkDatepickerDayView
  ],
  imports: [
    CommonModule, FormsModule
  ],
  providers: [],
  exports: [StkDatepicker, StkInputDatepicker],
  entryComponents: [StkDatepicker]
})
export class StkDatepickerModule { }
