import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { ErrorContainerComponent } from './error-container.component';


describe('ErrorContainerComponent', () => {
  let component: ErrorContainerComponent;
  let fixture: ComponentFixture<ErrorContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorContainerComponent ],
      imports: [ReactiveFormsModule],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorContainerComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({foo: new FormControl()});
    component.config = { name: 'foo', x_isLookupTemplated: false, x_cascadeFrom: null};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
