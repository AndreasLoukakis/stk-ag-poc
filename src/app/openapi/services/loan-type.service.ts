/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { LoanTypeDto } from '../models/loan-type-dto';
import { PagedOfLoanTypeDto } from '../models/paged-of-loan-type-dto';

@Injectable({
  providedIn: 'root',
})
export class LoanTypeService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation loanTypeSearch
   */
  static readonly LoanTypeSearchPath = '/loan-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loanTypeSearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  loanTypeSearch$Response(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<StrictHttpResponse<PagedOfLoanTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, LoanTypeService.LoanTypeSearchPath, 'get');
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
        return r as StrictHttpResponse<PagedOfLoanTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `loanTypeSearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loanTypeSearch(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<PagedOfLoanTypeDto> {

    return this.loanTypeSearch$Response(params).pipe(
      map((r: StrictHttpResponse<PagedOfLoanTypeDto>) => r.body as PagedOfLoanTypeDto)
    );
  }

  /**
   * Path part for operation loanTypeFind
   */
  static readonly LoanTypeFindPath = '/loan-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loanTypeFind()` instead.
   *
   * This method doesn't expect any request body.
   */
  loanTypeFind$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<LoanTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, LoanTypeService.LoanTypeFindPath, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoanTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `loanTypeFind$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loanTypeFind(params: {
    id: number;

  }): Observable<LoanTypeDto> {

    return this.loanTypeFind$Response(params).pipe(
      map((r: StrictHttpResponse<LoanTypeDto>) => r.body as LoanTypeDto)
    );
  }

  /**
   * Path part for operation loanTypeFindProperty2
   */
  static readonly LoanTypeFindProperty2Path = '/applications/{id}/LoanType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loanTypeFindProperty2()` instead.
   *
   * This method doesn't expect any request body.
   */
  loanTypeFindProperty2$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<LoanTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, LoanTypeService.LoanTypeFindProperty2Path, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoanTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `loanTypeFindProperty2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loanTypeFindProperty2(params: {
    id: number;

  }): Observable<LoanTypeDto> {

    return this.loanTypeFindProperty2$Response(params).pipe(
      map((r: StrictHttpResponse<LoanTypeDto>) => r.body as LoanTypeDto)
    );
  }

  /**
   * Path part for operation loanTypeFindProperty
   */
  static readonly LoanTypeFindPropertyPath = '/applications/{id}/LoanType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loanTypeFindProperty()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loanTypeFindProperty$Response(params: {
    id: number;
      body: LoanTypeDto
  }): Observable<StrictHttpResponse<LoanTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, LoanTypeService.LoanTypeFindPropertyPath, 'put');
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
        return r as StrictHttpResponse<LoanTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `loanTypeFindProperty$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loanTypeFindProperty(params: {
    id: number;
      body: LoanTypeDto
  }): Observable<LoanTypeDto> {

    return this.loanTypeFindProperty$Response(params).pipe(
      map((r: StrictHttpResponse<LoanTypeDto>) => r.body as LoanTypeDto)
    );
  }

  /**
   * Path part for operation loanTypeDeleteProperty
   */
  static readonly LoanTypeDeletePropertyPath = '/applications/{id}/LoanType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loanTypeDeleteProperty()` instead.
   *
   * This method doesn't expect any request body.
   */
  loanTypeDeleteProperty$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, LoanTypeService.LoanTypeDeletePropertyPath, 'delete');
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
   * To access the full response (for headers, for example), `loanTypeDeleteProperty$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loanTypeDeleteProperty(params: {
    id: number;

  }): Observable<Blob> {

    return this.loanTypeDeleteProperty$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
