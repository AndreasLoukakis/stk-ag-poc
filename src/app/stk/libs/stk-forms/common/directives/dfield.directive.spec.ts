import { DFieldDirective } from './dfield.directive';
import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

let resolver: ComponentFactoryResolver;
let container: ViewContainerRef;

describe('DFieldDirective', () => {
  it('should create an instance', () => {
    const directive = new DFieldDirective(resolver, container);
    expect(directive).toBeTruthy();
  });
});
