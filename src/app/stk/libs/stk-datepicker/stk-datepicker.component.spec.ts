import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StkDatepicker } from './stk-datepicker.component';

describe('StkDatepickerComponent', () => {
  let component: StkDatepicker;
  let fixture: ComponentFixture<StkDatepicker>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StkDatepicker ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StkDatepicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
