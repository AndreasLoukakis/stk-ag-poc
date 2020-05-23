import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundRowComponent } from './compound-row.component';

describe('CompoundRowComponent', () => {
  let component: CompoundRowComponent;
  let fixture: ComponentFixture<CompoundRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
