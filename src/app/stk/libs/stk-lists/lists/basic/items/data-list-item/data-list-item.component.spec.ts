import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataListItemComponent } from './data-list-item.component';
import { defaultConfig } from '../../../../common/interfaces/listconfig.interface';

describe('DataListItemComponent', () => {
  let component: DataListItemComponent;
  let fixture: ComponentFixture<DataListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataListItemComponent);
    component = fixture.componentInstance;
    component.config = defaultConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
