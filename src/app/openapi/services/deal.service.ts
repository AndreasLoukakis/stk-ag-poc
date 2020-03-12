/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { DealDto } from '../models/deal-dto';
import { PagedOfDealSummaryDto } from '../models/paged-of-deal-summary-dto';

@Injectable({
  providedIn: 'root',
})
export class DealService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation dealSearch
   */
  static readonly DealSearchPath = '/deals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dealSearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  dealSearch$Response(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<StrictHttpResponse<PagedOfDealSummaryDto>> {

    const rb = new RequestBuilder(this.rootUrl, DealService.DealSearchPath, 'get');
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
        return r as StrictHttpResponse<PagedOfDealSummaryDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `dealSearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dealSearch(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<PagedOfDealSummaryDto> {

    return this.dealSearch$Response(params).pipe(
      map((r: StrictHttpResponse<PagedOfDealSummaryDto>) => r.body as PagedOfDealSummaryDto)
    );
  }

  /**
   * Path part for operation dealCreate
   */
  static readonly DealCreatePath = '/deals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dealCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  dealCreate$Response(params: {
      body: DealDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DealService.DealCreatePath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `dealCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  dealCreate(params: {
      body: DealDto
  }): Observable<void> {

    return this.dealCreate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation dealFind
   */
  static readonly DealFindPath = '/deals/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dealFind()` instead.
   *
   * This method doesn't expect any request body.
   */
  dealFind$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<DealDto>> {

    const rb = new RequestBuilder(this.rootUrl, DealService.DealFindPath, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DealDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `dealFind$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dealFind(params: {
    id: number;

  }): Observable<DealDto> {

    return this.dealFind$Response(params).pipe(
      map((r: StrictHttpResponse<DealDto>) => r.body as DealDto)
    );
  }

  /**
   * Path part for operation dealUpdate
   */
  static readonly DealUpdatePath = '/deals/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dealUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  dealUpdate$Response(params: {
    id: number;
      body: DealDto
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, DealService.DealUpdatePath, 'put');
    if (params) {

      rb.path('Id', params.id);

      rb.body(params.body, 'application/json');
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
   * To access the full response (for headers, for example), `dealUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  dealUpdate(params: {
    id: number;
      body: DealDto
  }): Observable<Blob> {

    return this.dealUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
