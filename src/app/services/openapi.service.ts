import { Injectable } from '@angular/core';
import { tempMeta } from './temp-meta';
import { PreFieldConfig } from './../models';
import { PrefixNot } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class OpenapiService {

  constructor() { }

  getMeta(resource: string): PreFieldConfig {
    return tempMeta[resource];
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
