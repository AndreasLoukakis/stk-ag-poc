import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DFormComponent } from './dform.component';
import { DFieldDirective } from '../../common/directives/dfield.directive';
import { InputTextComponent } from '../../elements/input-text/input-text.component';
import { ErrorContainerComponent } from '../../common/components/error-container/error-container.component';

@NgModule({
  declarations: [InputTextComponent, ErrorContainerComponent],
  imports: [ReactiveFormsModule, CommonModule],
  entryComponents: [
    InputTextComponent
  ]
})
class TestModule {}

describe('DformComponent', () => {
  let component: DFormComponent;
  let fixture: ComponentFixture<DFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DFormComponent, DFieldDirective ],
      imports: [ReactiveFormsModule, TestModule],
      providers: [
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DFormComponent);
    component = fixture.componentInstance;
    component.fields$ = of([{name: 'foo', x_fieldType: 'input.text'}]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
