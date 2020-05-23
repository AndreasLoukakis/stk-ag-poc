import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StkTablesComponent } from './stk-tables.component';

describe('StkTablesComponent', () => {
  let component: StkTablesComponent;
  let fixture: ComponentFixture<StkTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StkTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StkTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
