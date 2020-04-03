import {
  Directive, Input, ViewContainerRef, ComponentFactoryResolver,
  ComponentRef, OnChanges, SimpleChanges, OnInit,
} from '@angular/core';
import { ResourceInfo } from './../interfaces';
import { ComplexBaseComponent } from '../abstract/complex-base-component';
import { ComponentMapperService } from '../../common/services/component-mapper.service';
import { UtilsService as Utils } from '../services/utils.service';


@Directive({
  selector: '[appRenderer]'
})
export class RendererDirective implements OnChanges, OnInit {

  @Input() renderInfo: ResourceInfo;

  component: ComponentRef<ComplexBaseComponent>;

  constructor(
    public hostcmp: ComplexBaseComponent,
    private viewRef: ViewContainerRef,
    private factory: ComponentFactoryResolver,
    private mapper: ComponentMapperService
  ) { }

  ngOnInit() {
  }

  // maybe renderInfo should have a setter instead ?
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.renderInfo) { return; }
    if (this.component && this.component.instance) {
      this.component.instance.renderInfo = changes.renderInfo.currentValue;
    } else {
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
    let className = Utils.nameToComponentClass(name);
    const fileName = Utils.nameToComponentFile(name);
    const folder = Utils.nameToComponentFolder(name);
    let module;
    try {
      module = await import (`./../../common/lazy/${folder}/${fileName}`);
    } catch (e) {
      console.error('Component not implemented or not properly resolved', e);
      module = await import (`../../common/lazy/fallback/fallback.component`);
      className = 'FallbackComponent';
    }

    this.component = this.viewRef.createComponent(this.factory.resolveComponentFactory<ComplexBaseComponent>(module[className]));
    this.component.instance.renderInfo = instanceData;

    this.component.instance.childResourceStateChange.subscribe(
      newVal => {
        this.hostcmp.setContext();
      }
    );

  }


}

