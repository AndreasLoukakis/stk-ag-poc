/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { MortgageProductDto } from '../models/mortgage-product-dto';
import { PagedOfMortgageProductDto } from '../models/paged-of-mortgage-product-dto';

@Injectable({
  providedIn: 'root',
})
export class MortgageProductService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation mortgageProductSearch
   */
  static readonly MortgageProductSearchPath = '/mortgageProducts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mortgageProductSearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  mortgageProductSearch$Response(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<StrictHttpResponse<PagedOfMortgageProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, MortgageProductService.MortgageProductSearchPath, 'get');
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
        return r as StrictHttpResponse<PagedOfMortgageProductDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `mortgageProductSearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mortgageProductSearch(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<PagedOfMortgageProductDto> {

    return this.mortgageProductSearch$Response(params).pipe(
      map((r: StrictHttpResponse<PagedOfMortgageProductDto>) => r.body as PagedOfMortgageProductDto)
    );
  }

  /**
   * Path part for operation mortgageProductFind
   */
  static readonly MortgageProductFindPath = '/mortgageProducts/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mortgageProductFind()` instead.
   *
   * This method doesn't expect any request body.
   */
  mortgageProductFind$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<MortgageProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, MortgageProductService.MortgageProductFindPath, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MortgageProductDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `mortgageProductFind$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mortgageProductFind(params: {
    id: number;

  }): Observable<MortgageProductDto> {

    return this.mortgageProductFind$Response(params).pipe(
      map((r: StrictHttpResponse<MortgageProductDto>) => r.body as MortgageProductDto)
    );
  }

  /**
   * Path part for operation mortgageProductFindProperty2
   */
  static readonly MortgageProductFindProperty2Path = '/applications/{id}/MortgageProduct';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mortgageProductFindProperty2()` instead.
   *
   * This method doesn't expect any request body.
   */
  mortgageProductFindProperty2$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<MortgageProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, MortgageProductService.MortgageProductFindProperty2Path, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MortgageProductDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `mortgageProductFindProperty2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mortgageProductFindProperty2(params: {
    id: number;

  }): Observable<MortgageProductDto> {

    return this.mortgageProductFindProperty2$Response(params).pipe(
      map((r: StrictHttpResponse<MortgageProductDto>) => r.body as MortgageProductDto)
    );
  }

  /**
   * Path part for operation mortgageProductFindProperty
   */
  static readonly MortgageProductFindPropertyPath = '/applications/{id}/MortgageProduct';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mortgageProductFindProperty()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  mortgageProductFindProperty$Response(params: {
    id: number;
      body: MortgageProductDto
  }): Observable<StrictHttpResponse<MortgageProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, MortgageProductService.MortgageProductFindPropertyPath, 'put');
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
        return r as StrictHttpResponse<MortgageProductDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `mortgageProductFindProperty$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  mortgageProductFindProperty(params: {
    id: number;
      body: MortgageProductDto
  }): Observable<MortgageProductDto> {

    return this.mortgageProductFindProperty$Response(params).pipe(
      map((r: StrictHttpResponse<MortgageProductDto>) => r.body as MortgageProductDto)
    );
  }

  /**
   * Path part for operation mortgageProductDeleteProperty
   */
  static readonly MortgageProductDeletePropertyPath = '/applications/{id}/MortgageProduct';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mortgageProductDeleteProperty()` instead.
   *
   * This method doesn't expect any request body.
   */
  mortgageProductDeleteProperty$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, MortgageProductService.MortgageProductDeletePropertyPath, 'delete');
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
   * To access the full response (for headers, for example), `mortgageProductDeleteProperty$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mortgageProductDeleteProperty(params: {
    id: number;

  }): Observable<Blob> {

    return this.mortgageProductDeleteProperty$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
