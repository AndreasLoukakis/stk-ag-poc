import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { InputCheckboxComponent } from './input-checkbox.component';
import { ErrorContainerComponent } from '../../common/components/error-container/error-container.component';


describe('InputCheckboxComponent', () => {
  let component: InputCheckboxComponent;
  let fixture: ComponentFixture<InputCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputCheckboxComponent, ErrorContainerComponent ],
      imports: [ReactiveFormsModule],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCheckboxComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({foo: new FormControl()});
    component.config = { name: 'foo', x_isLookupTemplated: false, x_cascadeFrom: null};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
