import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { HalService } from './hal.service';
import { ResourceHelpersService } from './resource-helpers.service';
import { DynamicClass } from './../../openapi-stubs/dynamic-class-proxy';
import { TranslateService as Lang } from './translate.service';
import { OpenApiModelService } from './../open-api-parser/open-api.service';
import { environment } from './../../../environments/environment';

import { ResourceInfo, RenderData, ExtendedFieldConfig } from './../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private hal: HalService,
    private resourceHelpers: ResourceHelpersService,
    private model: OpenApiModelService
  ) { }

  initResource(resourceInfo: ResourceInfo): Observable<InitResourceResponse> {

    if (!resourceInfo || !resourceInfo.propertyName) { return of({}); }
    const path = resourceInfo.href.replace(environment.apiUrl, '');
    /**
     * If property value is not set, we cant "get" the resource.
     * Just return meta data
     */

    if (!resourceInfo[resourceInfo.valueProp]) {

      // const instance = new DynamicClass(resourceInfo.classRef);
      return this.model.domain$.pipe(
        map(model => {
          const schema = model.path(path).schema;
          return {
            renderData: {
              formElements: {
                [resourceInfo.propertyName]: this.createItemMeta(resourceInfo, schema)
              },
              schema
            },
            subResources: {}
          };
        })
      );
      // const meta = {
      //   renderData: {
      //     formElements: {
      //       [resourceInfo.propertyName]: this.createItemMeta(resourceInfo, instance)
      //     },
      //     instance
      //   },
      //   subResources: {}
      // };
      // return of(meta);
    }
    return combineLatest(
        this.model.domain$,
        this.hal.getResource(resourceInfo.href)
      ).pipe(
      map(([model, response]) => {
        const meta = model.path(path);
        const schema = model.path(path).schema;
        const props = model.path(path).schema.properties;
        const getAction = model.path(path).get;
        const res = {schema: model.path(path).schema, response, model};

        return res;
      }),
      map(({response, schema, model}) => {
        const subResources = this.resourceHelpers.formatResources(response, schema, model);
        const res = {response, subResources, schema};
        return res;
      }),
      map(({response, subResources, schema}) => {
        // pass parent class meta to relevant child class
        // Object.keys(subResources).map(key => {
        //   if (instance[key]) {
        //     subResources[key].meta = subResources[key].meta || {};
        //     Object.keys(instance[key]).map(instanceKey => {
        //       if (!['value', 'type'].includes(instanceKey)) {
        //         subResources[key].meta[instanceKey] = instance[key][instanceKey];
        //       }
        //     });
        //   }
        // });
        return {schema, subResources};
      }),
      map(({schema, subResources}) => {
        const meta = Object.keys(resourceInfo.meta || {}).reduce((o, key) => {
          if (key === 'type' && resourceInfo.meta.type.indexOf('ReferenceOf') > -1) {
            o.classRef = resourceInfo.meta.type.replace('ReferenceOf', '');
          } else {
            o[key] = resourceInfo.meta[key];
          }
          return o;
        }, this.createItemMeta(resourceInfo, schema));

        return {
          renderData: {
            formElements: {
              [resourceInfo.propertyName]: meta
            },
            schema
          },
          subResources
        };
      })
    );
  }

  createItemMeta(resourceInfo: ResourceInfo, schema) {
    const props = schema.properties.map(p => p.name);
    const result: ExtendedFieldConfig = {
      title: Lang.translate(resourceInfo.propertyName),
      name: resourceInfo.propertyName,
      // tslint:disable:no-string-literal
      valueProp: resourceInfo.valueProp || 'id',
      descriptionProp: props.includes('description') ? 'description' : props.includes('name') ? 'name' : null,
      properties: props,
      value: resourceInfo[resourceInfo.valueProp] ? resourceInfo[resourceInfo.valueProp] : null
    };

    debugger;
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
