/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ConsumerFactoryProductDto } from '../models/consumer-factory-product-dto';
import { PagedOfConsumerFactoryProductDto } from '../models/paged-of-consumer-factory-product-dto';

@Injectable({
  providedIn: 'root',
})
export class ConsumerFactoryProductService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation consumerFactoryProductSearch
   */
  static readonly ConsumerFactoryProductSearchPath = '/consumer-factory-products';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `consumerFactoryProductSearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  consumerFactoryProductSearch$Response(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<StrictHttpResponse<PagedOfConsumerFactoryProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConsumerFactoryProductService.ConsumerFactoryProductSearchPath, 'get');
    if (params) {

      rb.query('PageIndex', params.pageIndex);
      rb.query('PageSize', params.pageSize);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PagedOfConsumerFactoryProductDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `consumerFactoryProductSearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  consumerFactoryProductSearch(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<PagedOfConsumerFactoryProductDto> {

    return this.consumerFactoryProductSearch$Response(params).pipe(
      map((r: StrictHttpResponse<PagedOfConsumerFactoryProductDto>) => r.body as PagedOfConsumerFactoryProductDto)
    );
  }

  /**
   * Path part for operation consumerFactoryProductFind
   */
  static readonly ConsumerFactoryProductFindPath = '/consumer-factory-products/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `consumerFactoryProductFind()` instead.
   *
   * This method doesn't expect any request body.
   */
  consumerFactoryProductFind$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<ConsumerFactoryProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConsumerFactoryProductService.ConsumerFactoryProductFindPath, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ConsumerFactoryProductDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `consumerFactoryProductFind$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  consumerFactoryProductFind(params: {
    id: number;

  }): Observable<ConsumerFactoryProductDto> {

    return this.consumerFactoryProductFind$Response(params).pipe(
      map((r: StrictHttpResponse<ConsumerFactoryProductDto>) => r.body as ConsumerFactoryProductDto)
    );
  }

  /**
   * Path part for operation consumerFactoryProductFindProperty2
   */
  static readonly ConsumerFactoryProductFindProperty2Path = '/consumerProducts/{id}/FactoryProduct';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `consumerFactoryProductFindProperty2()` instead.
   *
   * This method doesn't expect any request body.
   */
  consumerFactoryProductFindProperty2$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<ConsumerFactoryProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConsumerFactoryProductService.ConsumerFactoryProductFindProperty2Path, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ConsumerFactoryProductDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `consumerFactoryProductFindProperty2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  consumerFactoryProductFindProperty2(params: {
    id: number;

  }): Observable<ConsumerFactoryProductDto> {

    return this.consumerFactoryProductFindProperty2$Response(params).pipe(
      map((r: StrictHttpResponse<ConsumerFactoryProductDto>) => r.body as ConsumerFactoryProductDto)
    );
  }

  /**
   * Path part for operation consumerFactoryProductFindProperty
   */
  static readonly ConsumerFactoryProductFindPropertyPath = '/consumerProducts/{id}/FactoryProduct';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `consumerFactoryProductFindProperty()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  consumerFactoryProductFindProperty$Response(params: {
    id: number;
      body: ConsumerFactoryProductDto
  }): Observable<StrictHttpResponse<ConsumerFactoryProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConsumerFactoryProductService.ConsumerFactoryProductFindPropertyPath, 'put');
    if (params) {

      rb.path('Id', params.id);

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ConsumerFactoryProductDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `consumerFactoryProductFindProperty$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  consumerFactoryProductFindProperty(params: {
    id: number;
      body: ConsumerFactoryProductDto
  }): Observable<ConsumerFactoryProductDto> {

    return this.consumerFactoryProductFindProperty$Response(params).pipe(
      map((r: StrictHttpResponse<ConsumerFactoryProductDto>) => r.body as ConsumerFactoryProductDto)
    );
  }

  /**
   * Path part for operation consumerFactoryProductDeleteProperty
   */
  static readonly ConsumerFactoryProductDeletePropertyPath = '/consumerProducts/{id}/FactoryProduct';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `consumerFactoryProductDeleteProperty()` instead.
   *
   * This method doesn't expect any request body.
   */
  consumerFactoryProductDeleteProperty$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ConsumerFactoryProductService.ConsumerFactoryProductDeletePropertyPath, 'delete');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/octet-stream'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `consumerFactoryProductDeleteProperty$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  consumerFactoryProductDeleteProperty(params: {
    id: number;

  }): Observable<Blob> {

    return this.consumerFactoryProductDeleteProperty$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
