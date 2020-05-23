import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StkPaginationComponent } from './stk-pagination.component';

describe('StkPaginationComponent', () => {
  let component: StkPaginationComponent;
  let fixture: ComponentFixture<StkPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StkPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StkPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
