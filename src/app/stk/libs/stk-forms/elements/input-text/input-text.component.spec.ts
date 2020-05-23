import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { InputTextComponent } from './input-text.component';
import { ErrorContainerComponent } from '../../common/components/error-container/error-container.component';


describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTextComponent, ErrorContainerComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        // { provide: FormElementsBaseComponent, useClass: MockFormElementsBaseComponent },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({foo: new FormControl()});
    component.config = { name: 'foo', x_isLookupTemplated: false, x_cascadeFrom: null};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
