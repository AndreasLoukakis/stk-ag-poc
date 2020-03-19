import {
  Directive, Input, ViewContainerRef, ComponentFactoryResolver,
  ComponentRef, OnChanges, SimpleChanges, OnInit
} from '@angular/core';
import { ResourceInfo, LazyInterface } from './../models';
import { Observable } from 'rxjs';

import { ComponentMapperService } from './../services/component-mapper.service';

@Directive({
  selector: '[appRenderer]'
})
export class RendererDirective implements OnChanges, OnInit {

  @Input() renderInfo: ResourceInfo;
  component: ComponentRef<LazyInterface>;

  constructor(
    private viewRef: ViewContainerRef,
    private factory: ComponentFactoryResolver,
    private mapper: ComponentMapperService
  ) { }

  ngOnInit() {
    // if (this.renderInfo) {
    //   this.getComponent(this.mapper.getComponentName(this.renderInfo.currieName), this.renderInfo);
    // }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes in directive ', changes, this.component);
    if (changes.renderInfo && this.component) {
      this.component.instance.renderInfo = changes.renderInfo.currentValue;
    } else if (!this.component && !this.component?.instance) {
      if (changes.renderInfo && changes.renderInfo.currentValue) {
        const name = changes.renderInfo.currentValue?.currieName;
        this.getComponent(this.mapper.getComponentName(name), changes.renderInfo.currentValue);
      }
    }
  }

  /**
   * Lazy loading components
   * @param name : string, must follow specific contract in order to resolve proper component.
   */
  async getComponent(name: string, instanceData) {
    this.viewRef.clear();
    let className = this.nameToComponentClass(name);
    const fileName = this.nameToComponentFile(name);
    const folder = this.nameToComponentFolder(name);
    let module;
    try {
      module = await import (`./../components/lazy/${folder}/${fileName}`);
    } catch (e) {
      console.error('Component not implemented or not properly resolved', e);
      module = await import (`./../components/lazy/fallback/fallback.component`);
      className = 'FallbackComponent';
    }

    this.component = this.viewRef.createComponent(this.factory.resolveComponentFactory<LazyInterface>(module[className]));
    this.component.instance.renderInfo = instanceData;
  }

  nameToClass(name: string) {
    return name.split('-').map(item => `${item.charAt(0).toUpperCase()}${item.substr(1)}`).join('');
  }

  nameToComponentClass(name: string) {
    return `${this.nameToClass(name)}Component`;
  }

  nameToComponentFolder(name: string) {
    return `${name.split(/(?=[A-Z])/).join('-').toLowerCase()}`;
  }

  nameToComponentFile(name: string) {
    return `${this.nameToComponentFolder(name)}.component`;
  }

}

