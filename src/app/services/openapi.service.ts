import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenapiService {

  constructor() { }

  async getMeta(resourceName: string) {
    let meta;
    try {
      meta = await import (`./../openapi/metaModels/${resourceName}-dto`);
    } catch (e) {
      console.error('Resource metadata not available or nor properly resolved', e);
      throw new Error(e);
    }
    return meta;
  }
}
