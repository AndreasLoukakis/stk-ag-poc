import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { SimpleSelectComponent } from './simple-select.component';
import { ErrorContainerComponent } from '../../common/components/error-container/error-container.component';


describe('SimpleSelectComponent', () => {
  let component: SimpleSelectComponent;
  let fixture: ComponentFixture<SimpleSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSelectComponent, ErrorContainerComponent ],
      imports: [ReactiveFormsModule],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSelectComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({foo: new FormControl()});
    component.config = { name: 'foo', x_isLookupTemplated: false, x_cascadeFrom: null};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
