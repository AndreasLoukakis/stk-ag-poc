import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormElement } from '../form-elements-base';
import { StkInputDatepickerConfig, StkDateStruct } from 'stk-datepicker';
import { DateConfig, dateConfigDefault } from '../../common/interfaces/date-config';


@Component({
  selector: 'stk-date-input',
  providers: [ StkInputDatepickerConfig ],
  templateUrl: 'input-date.component.html'
})
export class InputDateComponent extends FormElement implements OnInit {

  @Input() dateConfig: DateConfig;

  constructor() {
    super();
  }

  ngOnInit() {
    this.dateConfig = { ...dateConfigDefault, ...this.dateConfig };
    Object.keys(this.dateConfig).map(key => {
      if (['minDate', 'maxDate'].indexOf(key) > -1) {
        this.dateConfig[key] = this.normalizeMinMaxDates(this.dateConfig[key]);
      }
    });
  }


  normalizeMinMaxDates(dt: any): StkDateStruct {
    if (typeof dt === 'string') {
      return this.dateStructFromString(dt);
    } else if (dt instanceof Date) {
      return this.dateStructFromDate(dt);
    }
    return dt;
  }

  dateStructFromDate(dt: Date): StkDateStruct {
    return {
      year: dt.getFullYear(),
      month: dt.getMonth() + 1,
      day: dt.getDate()
    };
  }

  dateStructFromString(dt: string): StkDateStruct {
    try {
      return this.dateStructFromDate(new Date(dt));
    } catch (e) {
      console.error('stk-datepicker: error converting to date', e);
    }
  }

}
