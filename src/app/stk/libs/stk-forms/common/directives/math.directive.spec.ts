import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MathDirective } from './math.directive';
import { NgControl, FormControl } from '@angular/forms';

// const formControlSpy: jasmine.SpyObj<NgControl> = new FormControl();

@Component({
  template: '<div><input #inp [(ngModel)]="str" stkMath /></div>'
})

class TestHostComponent {
  str = '';

}

fdescribe('MathDirective', () => {

  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let de: DebugElement;
  let inputEl: DebugElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  // it('should create an instance', () => {
  //   const directive = new MathDirective();
  //   expect(directive).toBeTruthy();
  // });

  fit('should get triggered on blur', () => {
    const inp = inputEl.nativeElement;
    inp.value = '123+1';
    inp.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component.str).toEqual('124');
  });

  // it('should not modify the input if it does not contain only digits and math symbols', () => {
  //   const directive = new MathDirective(formControlSpy);
  //   formControlSpy = jasmine.createSpyObj('NgControl', ['123A+3']);
  //   formControlSpy.
  //   const str = '123A+3';

  // });
});
