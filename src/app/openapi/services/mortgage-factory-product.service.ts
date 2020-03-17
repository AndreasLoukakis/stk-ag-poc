/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { MortgageFactoryProductDto } from '../models/mortgage-factory-product-dto';
import { PagedOfMortgageFactoryProductDto } from '../models/paged-of-mortgage-factory-product-dto';

@Injectable({
  providedIn: 'root',
})
export class MortgageFactoryProductService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation mortgageFactoryProductSearch
   */
  static readonly MortgageFactoryProductSearchPath = '/mortgageFactoryProducts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mortgageFactoryProductSearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  mortgageFactoryProductSearch$Response(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<StrictHttpResponse<PagedOfMortgageFactoryProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, MortgageFactoryProductService.MortgageFactoryProductSearchPath, 'get');
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
        return r as StrictHttpResponse<PagedOfMortgageFactoryProductDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `mortgageFactoryProductSearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mortgageFactoryProductSearch(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<PagedOfMortgageFactoryProductDto> {

    return this.mortgageFactoryProductSearch$Response(params).pipe(
      map((r: StrictHttpResponse<PagedOfMortgageFactoryProductDto>) => r.body as PagedOfMortgageFactoryProductDto)
    );
  }

  /**
   * Path part for operation mortgageFactoryProductFind
   */
  static readonly MortgageFactoryProductFindPath = '/mortgageFactoryProducts/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mortgageFactoryProductFind()` instead.
   *
   * This method doesn't expect any request body.
   */
  mortgageFactoryProductFind$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<MortgageFactoryProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, MortgageFactoryProductService.MortgageFactoryProductFindPath, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MortgageFactoryProductDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `mortgageFactoryProductFind$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mortgageFactoryProductFind(params: {
    id: number;

  }): Observable<MortgageFactoryProductDto> {

    return this.mortgageFactoryProductFind$Response(params).pipe(
      map((r: StrictHttpResponse<MortgageFactoryProductDto>) => r.body as MortgageFactoryProductDto)
    );
  }

  /**
   * Path part for operation mortgageFactoryProductFindProperty2
   */
  static readonly MortgageFactoryProductFindProperty2Path = '/mortgageProducts/{id}/FactoryProduct';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mortgageFactoryProductFindProperty2()` instead.
   *
   * This method doesn't expect any request body.
   */
  mortgageFactoryProductFindProperty2$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<MortgageFactoryProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, MortgageFactoryProductService.MortgageFactoryProductFindProperty2Path, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MortgageFactoryProductDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `mortgageFactoryProductFindProperty2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mortgageFactoryProductFindProperty2(params: {
    id: number;

  }): Observable<MortgageFactoryProductDto> {

    return this.mortgageFactoryProductFindProperty2$Response(params).pipe(
      map((r: StrictHttpResponse<MortgageFactoryProductDto>) => r.body as MortgageFactoryProductDto)
    );
  }

  /**
   * Path part for operation mortgageFactoryProductFindProperty
   */
  static readonly MortgageFactoryProductFindPropertyPath = '/mortgageProducts/{id}/FactoryProduct';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mortgageFactoryProductFindProperty()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  mortgageFactoryProductFindProperty$Response(params: {
    id: number;
      body: MortgageFactoryProductDto
  }): Observable<StrictHttpResponse<MortgageFactoryProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, MortgageFactoryProductService.MortgageFactoryProductFindPropertyPath, 'put');
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
        return r as StrictHttpResponse<MortgageFactoryProductDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `mortgageFactoryProductFindProperty$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  mortgageFactoryProductFindProperty(params: {
    id: number;
      body: MortgageFactoryProductDto
  }): Observable<MortgageFactoryProductDto> {

    return this.mortgageFactoryProductFindProperty$Response(params).pipe(
      map((r: StrictHttpResponse<MortgageFactoryProductDto>) => r.body as MortgageFactoryProductDto)
    );
  }

  /**
   * Path part for operation mortgageFactoryProductDeleteProperty
   */
  static readonly MortgageFactoryProductDeletePropertyPath = '/mortgageProducts/{id}/FactoryProduct';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mortgageFactoryProductDeleteProperty()` instead.
   *
   * This method doesn't expect any request body.
   */
  mortgageFactoryProductDeleteProperty$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, MortgageFactoryProductService.MortgageFactoryProductDeletePropertyPath, 'delete');
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
   * To access the full response (for headers, for example), `mortgageFactoryProductDeleteProperty$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mortgageFactoryProductDeleteProperty(params: {
    id: number;

  }): Observable<Blob> {

    return this.mortgageFactoryProductDeleteProperty$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
