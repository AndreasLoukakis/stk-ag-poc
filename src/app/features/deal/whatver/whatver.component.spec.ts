import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatverComponent } from './whatver.component';

describe('WhatverComponent', () => {
  let component: WhatverComponent;
  let fixture: ComponentFixture<WhatverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
