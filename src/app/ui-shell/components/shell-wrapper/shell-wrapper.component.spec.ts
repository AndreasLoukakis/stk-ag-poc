import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellWrapperComponent } from './shell-wrapper.component';

describe('ShellWrapperComponent', () => {
  let component: ShellWrapperComponent;
  let fixture: ComponentFixture<ShellWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShellWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
