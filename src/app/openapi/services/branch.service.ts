/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BranchDto } from '../models/branch-dto';
import { PagedOfBranchDto } from '../models/paged-of-branch-dto';

@Injectable({
  providedIn: 'root',
})
export class BranchService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation branchSearch
   */
  static readonly BranchSearchPath = '/branches';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `branchSearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  branchSearch$Response(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<StrictHttpResponse<PagedOfBranchDto>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.BranchSearchPath, 'get');
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
        return r as StrictHttpResponse<PagedOfBranchDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `branchSearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  branchSearch(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<PagedOfBranchDto> {

    return this.branchSearch$Response(params).pipe(
      map((r: StrictHttpResponse<PagedOfBranchDto>) => r.body as PagedOfBranchDto)
    );
  }

  /**
   * Path part for operation branchCreate
   */
  static readonly BranchCreatePath = '/branches';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `branchCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  branchCreate$Response(params: {
      body: BranchDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.BranchCreatePath, 'post');
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
   * To access the full response (for headers, for example), `branchCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  branchCreate(params: {
      body: BranchDto
  }): Observable<void> {

    return this.branchCreate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation branchFind
   */
  static readonly BranchFindPath = '/branches/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `branchFind()` instead.
   *
   * This method doesn't expect any request body.
   */
  branchFind$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<BranchDto>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.BranchFindPath, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BranchDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `branchFind$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  branchFind(params: {
    id: number;

  }): Observable<BranchDto> {

    return this.branchFind$Response(params).pipe(
      map((r: StrictHttpResponse<BranchDto>) => r.body as BranchDto)
    );
  }

  /**
   * Path part for operation branchUpdate
   */
  static readonly BranchUpdatePath = '/branches/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `branchUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  branchUpdate$Response(params: {
    id: number;
      body: BranchDto
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.BranchUpdatePath, 'put');
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
   * To access the full response (for headers, for example), `branchUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  branchUpdate(params: {
    id: number;
      body: BranchDto
  }): Observable<Blob> {

    return this.branchUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation branchDelete
   */
  static readonly BranchDeletePath = '/branches/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `branchDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  branchDelete$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.BranchDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `branchDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  branchDelete(params: {
    id: number;

  }): Observable<Blob> {

    return this.branchDelete$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation branchFindProperty2
   */
  static readonly BranchFindProperty2Path = '/applications/{id}/Branch';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `branchFindProperty2()` instead.
   *
   * This method doesn't expect any request body.
   */
  branchFindProperty2$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<BranchDto>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.BranchFindProperty2Path, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BranchDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `branchFindProperty2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  branchFindProperty2(params: {
    id: number;

  }): Observable<BranchDto> {

    return this.branchFindProperty2$Response(params).pipe(
      map((r: StrictHttpResponse<BranchDto>) => r.body as BranchDto)
    );
  }

  /**
   * Path part for operation branchFindProperty
   */
  static readonly BranchFindPropertyPath = '/applications/{id}/Branch';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `branchFindProperty()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  branchFindProperty$Response(params: {
    id: number;
      body: BranchDto
  }): Observable<StrictHttpResponse<BranchDto>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.BranchFindPropertyPath, 'put');
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
        return r as StrictHttpResponse<BranchDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `branchFindProperty$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  branchFindProperty(params: {
    id: number;
      body: BranchDto
  }): Observable<BranchDto> {

    return this.branchFindProperty$Response(params).pipe(
      map((r: StrictHttpResponse<BranchDto>) => r.body as BranchDto)
    );
  }

  /**
   * Path part for operation branchDeleteProperty
   */
  static readonly BranchDeletePropertyPath = '/applications/{id}/Branch';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `branchDeleteProperty()` instead.
   *
   * This method doesn't expect any request body.
   */
  branchDeleteProperty$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.BranchDeletePropertyPath, 'delete');
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
   * To access the full response (for headers, for example), `branchDeleteProperty$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  branchDeleteProperty(params: {
    id: number;

  }): Observable<Blob> {

    return this.branchDeleteProperty$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation branchFindProperty23
   */
  static readonly BranchFindProperty23Path = '/applications/{id}/BranchOther';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `branchFindProperty23()` instead.
   *
   * This method doesn't expect any request body.
   */
  branchFindProperty23$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<BranchDto>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.BranchFindProperty23Path, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BranchDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `branchFindProperty23$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  branchFindProperty23(params: {
    id: number;

  }): Observable<BranchDto> {

    return this.branchFindProperty23$Response(params).pipe(
      map((r: StrictHttpResponse<BranchDto>) => r.body as BranchDto)
    );
  }

  /**
   * Path part for operation branchFindProperty22
   */
  static readonly BranchFindProperty22Path = '/applications/{id}/BranchOther';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `branchFindProperty22()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  branchFindProperty22$Response(params: {
    id: number;
      body: BranchDto
  }): Observable<StrictHttpResponse<BranchDto>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.BranchFindProperty22Path, 'put');
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
        return r as StrictHttpResponse<BranchDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `branchFindProperty22$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  branchFindProperty22(params: {
    id: number;
      body: BranchDto
  }): Observable<BranchDto> {

    return this.branchFindProperty22$Response(params).pipe(
      map((r: StrictHttpResponse<BranchDto>) => r.body as BranchDto)
    );
  }

  /**
   * Path part for operation branchDeleteProperty2
   */
  static readonly BranchDeleteProperty2Path = '/applications/{id}/BranchOther';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `branchDeleteProperty2()` instead.
   *
   * This method doesn't expect any request body.
   */
  branchDeleteProperty2$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.BranchDeleteProperty2Path, 'delete');
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
   * To access the full response (for headers, for example), `branchDeleteProperty2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  branchDeleteProperty2(params: {
    id: number;

  }): Observable<Blob> {

    return this.branchDeleteProperty2$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
