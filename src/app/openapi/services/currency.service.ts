/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CurrencyDto } from '../models/currency-dto';
import { PagedOfCurrencyDto } from '../models/paged-of-currency-dto';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation currencySearch
   */
  static readonly CurrencySearchPath = '/currencies';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `currencySearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencySearch$Response(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<StrictHttpResponse<PagedOfCurrencyDto>> {

    const rb = new RequestBuilder(this.rootUrl, CurrencyService.CurrencySearchPath, 'get');
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
        return r as StrictHttpResponse<PagedOfCurrencyDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `currencySearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencySearch(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<PagedOfCurrencyDto> {

    return this.currencySearch$Response(params).pipe(
      map((r: StrictHttpResponse<PagedOfCurrencyDto>) => r.body as PagedOfCurrencyDto)
    );
  }

  /**
   * Path part for operation currencyFind
   */
  static readonly CurrencyFindPath = '/currencies/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `currencyFind()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyFind$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<CurrencyDto>> {

    const rb = new RequestBuilder(this.rootUrl, CurrencyService.CurrencyFindPath, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CurrencyDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `currencyFind$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyFind(params: {
    id: number;

  }): Observable<CurrencyDto> {

    return this.currencyFind$Response(params).pipe(
      map((r: StrictHttpResponse<CurrencyDto>) => r.body as CurrencyDto)
    );
  }

  /**
   * Path part for operation currencyFindProperty2
   */
  static readonly CurrencyFindProperty2Path = '/consumerProducts/{id}/Currency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `currencyFindProperty2()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyFindProperty2$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<CurrencyDto>> {

    const rb = new RequestBuilder(this.rootUrl, CurrencyService.CurrencyFindProperty2Path, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CurrencyDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `currencyFindProperty2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyFindProperty2(params: {
    id: number;

  }): Observable<CurrencyDto> {

    return this.currencyFindProperty2$Response(params).pipe(
      map((r: StrictHttpResponse<CurrencyDto>) => r.body as CurrencyDto)
    );
  }

  /**
   * Path part for operation currencyFindProperty
   */
  static readonly CurrencyFindPropertyPath = '/consumerProducts/{id}/Currency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `currencyFindProperty()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  currencyFindProperty$Response(params: {
    id: number;
      body: CurrencyDto
  }): Observable<StrictHttpResponse<CurrencyDto>> {

    const rb = new RequestBuilder(this.rootUrl, CurrencyService.CurrencyFindPropertyPath, 'put');
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
        return r as StrictHttpResponse<CurrencyDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `currencyFindProperty$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  currencyFindProperty(params: {
    id: number;
      body: CurrencyDto
  }): Observable<CurrencyDto> {

    return this.currencyFindProperty$Response(params).pipe(
      map((r: StrictHttpResponse<CurrencyDto>) => r.body as CurrencyDto)
    );
  }

  /**
   * Path part for operation currencyDeleteProperty
   */
  static readonly CurrencyDeletePropertyPath = '/consumerProducts/{id}/Currency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `currencyDeleteProperty()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyDeleteProperty$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, CurrencyService.CurrencyDeletePropertyPath, 'delete');
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
   * To access the full response (for headers, for example), `currencyDeleteProperty$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyDeleteProperty(params: {
    id: number;

  }): Observable<Blob> {

    return this.currencyDeleteProperty$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation currencyFindProperty23
   */
  static readonly CurrencyFindProperty23Path = '/mortgageProducts/{id}/Currency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `currencyFindProperty23()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyFindProperty23$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<CurrencyDto>> {

    const rb = new RequestBuilder(this.rootUrl, CurrencyService.CurrencyFindProperty23Path, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CurrencyDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `currencyFindProperty23$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyFindProperty23(params: {
    id: number;

  }): Observable<CurrencyDto> {

    return this.currencyFindProperty23$Response(params).pipe(
      map((r: StrictHttpResponse<CurrencyDto>) => r.body as CurrencyDto)
    );
  }

  /**
   * Path part for operation currencyFindProperty22
   */
  static readonly CurrencyFindProperty22Path = '/mortgageProducts/{id}/Currency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `currencyFindProperty22()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  currencyFindProperty22$Response(params: {
    id: number;
      body: CurrencyDto
  }): Observable<StrictHttpResponse<CurrencyDto>> {

    const rb = new RequestBuilder(this.rootUrl, CurrencyService.CurrencyFindProperty22Path, 'put');
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
        return r as StrictHttpResponse<CurrencyDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `currencyFindProperty22$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  currencyFindProperty22(params: {
    id: number;
      body: CurrencyDto
  }): Observable<CurrencyDto> {

    return this.currencyFindProperty22$Response(params).pipe(
      map((r: StrictHttpResponse<CurrencyDto>) => r.body as CurrencyDto)
    );
  }

  /**
   * Path part for operation currencyDeleteProperty2
   */
  static readonly CurrencyDeleteProperty2Path = '/mortgageProducts/{id}/Currency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `currencyDeleteProperty2()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyDeleteProperty2$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, CurrencyService.CurrencyDeleteProperty2Path, 'delete');
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
   * To access the full response (for headers, for example), `currencyDeleteProperty2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyDeleteProperty2(params: {
    id: number;

  }): Observable<Blob> {

    return this.currencyDeleteProperty2$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation currencyFindProperty25
   */
  static readonly CurrencyFindProperty25Path = '/consumerFactoryProducts/{id}/Currency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `currencyFindProperty25()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyFindProperty25$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<CurrencyDto>> {

    const rb = new RequestBuilder(this.rootUrl, CurrencyService.CurrencyFindProperty25Path, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CurrencyDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `currencyFindProperty25$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyFindProperty25(params: {
    id: number;

  }): Observable<CurrencyDto> {

    return this.currencyFindProperty25$Response(params).pipe(
      map((r: StrictHttpResponse<CurrencyDto>) => r.body as CurrencyDto)
    );
  }

  /**
   * Path part for operation currencyFindProperty24
   */
  static readonly CurrencyFindProperty24Path = '/consumerFactoryProducts/{id}/Currency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `currencyFindProperty24()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  currencyFindProperty24$Response(params: {
    id: number;
      body: CurrencyDto
  }): Observable<StrictHttpResponse<CurrencyDto>> {

    const rb = new RequestBuilder(this.rootUrl, CurrencyService.CurrencyFindProperty24Path, 'put');
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
        return r as StrictHttpResponse<CurrencyDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `currencyFindProperty24$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  currencyFindProperty24(params: {
    id: number;
      body: CurrencyDto
  }): Observable<CurrencyDto> {

    return this.currencyFindProperty24$Response(params).pipe(
      map((r: StrictHttpResponse<CurrencyDto>) => r.body as CurrencyDto)
    );
  }

  /**
   * Path part for operation currencyDeleteProperty22
   */
  static readonly CurrencyDeleteProperty22Path = '/consumerFactoryProducts/{id}/Currency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `currencyDeleteProperty22()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyDeleteProperty22$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, CurrencyService.CurrencyDeleteProperty22Path, 'delete');
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
   * To access the full response (for headers, for example), `currencyDeleteProperty22$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyDeleteProperty22(params: {
    id: number;

  }): Observable<Blob> {

    return this.currencyDeleteProperty22$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation currencyFindProperty27
   */
  static readonly CurrencyFindProperty27Path = '/mortgageFactoryProducts/{id}/Currency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `currencyFindProperty27()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyFindProperty27$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<CurrencyDto>> {

    const rb = new RequestBuilder(this.rootUrl, CurrencyService.CurrencyFindProperty27Path, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CurrencyDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `currencyFindProperty27$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyFindProperty27(params: {
    id: number;

  }): Observable<CurrencyDto> {

    return this.currencyFindProperty27$Response(params).pipe(
      map((r: StrictHttpResponse<CurrencyDto>) => r.body as CurrencyDto)
    );
  }

  /**
   * Path part for operation currencyFindProperty26
   */
  static readonly CurrencyFindProperty26Path = '/mortgageFactoryProducts/{id}/Currency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `currencyFindProperty26()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  currencyFindProperty26$Response(params: {
    id: number;
      body: CurrencyDto
  }): Observable<StrictHttpResponse<CurrencyDto>> {

    const rb = new RequestBuilder(this.rootUrl, CurrencyService.CurrencyFindProperty26Path, 'put');
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
        return r as StrictHttpResponse<CurrencyDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `currencyFindProperty26$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  currencyFindProperty26(params: {
    id: number;
      body: CurrencyDto
  }): Observable<CurrencyDto> {

    return this.currencyFindProperty26$Response(params).pipe(
      map((r: StrictHttpResponse<CurrencyDto>) => r.body as CurrencyDto)
    );
  }

  /**
   * Path part for operation currencyDeleteProperty23
   */
  static readonly CurrencyDeleteProperty23Path = '/mortgageFactoryProducts/{id}/Currency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `currencyDeleteProperty23()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyDeleteProperty23$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, CurrencyService.CurrencyDeleteProperty23Path, 'delete');
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
   * To access the full response (for headers, for example), `currencyDeleteProperty23$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  currencyDeleteProperty23(params: {
    id: number;

  }): Observable<Blob> {

    return this.currencyDeleteProperty23$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
