import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowNoResultsComponent } from './row-no-results.component';
import { defaultTableConfig } from '../../../common/table-config.interface';

describe('RowNoResultsComponent', () => {
  let component: RowNoResultsComponent;
  let fixture: ComponentFixture<RowNoResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowNoResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowNoResultsComponent);
    component = fixture.componentInstance;
    component.config = defaultTableConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
