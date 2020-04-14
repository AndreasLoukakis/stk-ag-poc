import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HalService } from './hal.service';
import { OpenapiService } from './openapi.service';
import { DynamicClass } from './../../openapi-stubs/dynamic-class-proxy';
import { TranslateService as Lang } from './translate.service';


import { ResourceInfo, RenderData, ExtendedFieldConfig } from './../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private hal: HalService,
    private oapi: OpenapiService
  ) { }

  initResource(resourceInfo: ResourceInfo): Observable<InitResourceResponse> {

    if (!resourceInfo || !resourceInfo.propertyName) { return of({}); }

    if (!resourceInfo[resourceInfo.valueProp]) {
      const instance = new DynamicClass(resourceInfo.classRef);
      const meta = {
        renderData: {
          formElements: {
            [resourceInfo.propertyName]: this.createItemMeta(resourceInfo, instance)
          },
          instance
        },
        subResources: {}
      };
      return of(meta);
    }
    return this.hal.getResource(resourceInfo.href).pipe(
      map((response) => {
        const res = {instance: new DynamicClass(resourceInfo.classRef, response), response};
        return res;
      }),
      map(({response, instance}) => {
        const subResources = this.hal.formatResources(response, instance);
        const res = {response, subResources};
        return res;
      }),
      map(({response, subResources}) => {
        const instance = new DynamicClass(resourceInfo.classRef, response);
        // pass parent class meta to relevant child class
        Object.keys(subResources).map(key => {
          if (instance[key]) {
            subResources[key].meta = subResources[key].meta || {};
            Object.keys(instance[key]).map(instanceKey => {
              if (!['value', 'type'].includes(instanceKey)) {
                subResources[key].meta[instanceKey] = instance[key][instanceKey];
              }
            });
          }
        });
        return {instance, subResources};
      }),
      map(({instance, subResources}) => {
        const meta = Object.keys(resourceInfo.meta || {}).reduce((o, key) => {
          if (key === 'type' && resourceInfo.meta.type.indexOf('ReferenceOf') > -1) {
            o.classRef = resourceInfo.meta.type.replace('ReferenceOf', '');
          } else {
            o[key] = resourceInfo.meta[key];
          }
          return o;
        }, this.createItemMeta(resourceInfo, instance));

        return {
          renderData: {
            formElements: {
              [resourceInfo.propertyName]: meta
            },
            instance
          },
          subResources
        };
      })
    );
  }

  createItemMeta(resourceInfo: ResourceInfo, instance) {
    const result: ExtendedFieldConfig = {
      title: Lang.translate(resourceInfo.propertyName),
      name: resourceInfo.propertyName,
      // tslint:disable:no-string-literal
      valueProp: resourceInfo.valueProp,
      descriptionProp: instance['description'] ? 'description' : instance['name'] ? 'name' : null,
      properties: Object.keys(instance),
      value: instance[resourceInfo.valueProp] ? instance[resourceInfo.valueProp].value : null
    };

    if (resourceInfo.values && resourceInfo.values.href) {
      result.x_lookupItems$ = this.hal.getResourceValues(resourceInfo)
        .pipe(
          map(response =>  response.items),
          map(items => {
            return items.map(item => ({
              name: item[result.descriptionProp],
              value: item[result.valueProp]
            }));
          })
        );
    }

    return result;
  }

  updateResource(href: string, data: {[key: string]: any}) {
    return this.hal.updateResource(href, data);
  }
}

export interface InitResourceResponse {
  renderData?: RenderData;
  subResources?: {
    [key: string]: ResourceInfo;
  };
}
