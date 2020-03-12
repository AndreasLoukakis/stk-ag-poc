import { Directive, Input, ViewContainerRef, ComponentFactoryResolver, OnInit, ComponentRef } from '@angular/core';
import { RendererInfo, LazyInterface } from './../models';

@Directive({
  selector: '[appRenderer]'
})
export class RendererDirective implements OnInit {

  @Input() renderInfo: RendererInfo;
  component: ComponentRef<LazyInterface>;

  constructor(
    private viewRef: ViewContainerRef,
    private factory: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.getComponent('branch');
  }

  /**
   * Lazy loading components
   * @param name : string, must follow specific contract in order to resolve proper component.
   */
  async getComponent(name: string) {
    this.viewRef.clear();
    const className = this.nameToComponentClass(name);
    const componentFilename = this.nameToComponentFile(name);

    const module = await import (`./../components/lazy/${name.toLowerCase()}/${componentFilename}`);
    this.component = this.viewRef.createComponent(this.factory.resolveComponentFactory<LazyInterface>(module[className]));
    this.component.instance.renderInfo = this.renderInfo;
  }

  nameToClass(name: string) {
    return name.split('-').map(item => `${item.charAt(0).toUpperCase()}${item.substr(1)}`).join('');
  }

  nameToComponentClass(name: string) {
    return `${this.nameToClass(name)}Component`;
  }

  nameToComponentFile(name: string) {
    return `${name.split(/(?=[A-Z])/)}.component`;
  }

}

