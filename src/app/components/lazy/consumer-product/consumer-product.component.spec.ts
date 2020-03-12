import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerProductComponent } from './consumer-product.component';

describe('ConsumerProductComponent', () => {
  let component: ConsumerProductComponent;
  let fixture: ComponentFixture<ConsumerProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
