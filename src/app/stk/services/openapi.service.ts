import { Injectable } from '@angular/core';
import { ExtendedFieldConfig } from './../interfaces';
import { DynamicClass } from './../../openapi-stubs/dynamic-class-proxy';
import { UtilsService as Utils } from './../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class OpenapiService {

  constructor() { }


  async getClass(resourceName: string) {

    const className = `${Utils.nameToClass(resourceName)}Dto`;

    let classRef;
    try {
      classRef = await import (`./../../openapi-stubs/${resourceName}-class-dto`);
    } catch (e) {
      console.error('Class reference not available or nor properly resolved', e);
      throw new Error(e);
    }
    return classRef[className];
  }

  // get meta object for resource
  // get available services, payloads etc for resource
  // input: resource name
  // translate to: [resourceName]-dto
  //

  // async getMeta(resourceName: string) {
  //   let meta;
  //   try {
  //     meta = await import (`./../openapi/metaModels/${resourceName}-dto`);
  //   } catch (e) {
  //     console.error('Resource metadata not available or nor properly resolved', e);
  //     throw new Error(e);
  //   }
  //   return meta;
  // }
}
