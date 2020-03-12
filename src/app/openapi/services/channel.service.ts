/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ChannelDto } from '../models/channel-dto';
import { PagedOfChannelDto } from '../models/paged-of-channel-dto';

@Injectable({
  providedIn: 'root',
})
export class ChannelService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation channelSearch
   */
  static readonly ChannelSearchPath = '/channels';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `channelSearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  channelSearch$Response(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<StrictHttpResponse<PagedOfChannelDto>> {

    const rb = new RequestBuilder(this.rootUrl, ChannelService.ChannelSearchPath, 'get');
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
        return r as StrictHttpResponse<PagedOfChannelDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `channelSearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  channelSearch(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<PagedOfChannelDto> {

    return this.channelSearch$Response(params).pipe(
      map((r: StrictHttpResponse<PagedOfChannelDto>) => r.body as PagedOfChannelDto)
    );
  }

  /**
   * Path part for operation channelFind
   */
  static readonly ChannelFindPath = '/channels/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `channelFind()` instead.
   *
   * This method doesn't expect any request body.
   */
  channelFind$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<ChannelDto>> {

    const rb = new RequestBuilder(this.rootUrl, ChannelService.ChannelFindPath, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ChannelDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `channelFind$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  channelFind(params: {
    id: number;

  }): Observable<ChannelDto> {

    return this.channelFind$Response(params).pipe(
      map((r: StrictHttpResponse<ChannelDto>) => r.body as ChannelDto)
    );
  }

  /**
   * Path part for operation channelFindProperty2
   */
  static readonly ChannelFindProperty2Path = '/applications/{id}/Channel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `channelFindProperty2()` instead.
   *
   * This method doesn't expect any request body.
   */
  channelFindProperty2$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<ChannelDto>> {

    const rb = new RequestBuilder(this.rootUrl, ChannelService.ChannelFindProperty2Path, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ChannelDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `channelFindProperty2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  channelFindProperty2(params: {
    id: number;

  }): Observable<ChannelDto> {

    return this.channelFindProperty2$Response(params).pipe(
      map((r: StrictHttpResponse<ChannelDto>) => r.body as ChannelDto)
    );
  }

  /**
   * Path part for operation channelFindProperty
   */
  static readonly ChannelFindPropertyPath = '/applications/{id}/Channel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `channelFindProperty()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  channelFindProperty$Response(params: {
    id: number;
      body: ChannelDto
  }): Observable<StrictHttpResponse<ChannelDto>> {

    const rb = new RequestBuilder(this.rootUrl, ChannelService.ChannelFindPropertyPath, 'put');
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
        return r as StrictHttpResponse<ChannelDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `channelFindProperty$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  channelFindProperty(params: {
    id: number;
      body: ChannelDto
  }): Observable<ChannelDto> {

    return this.channelFindProperty$Response(params).pipe(
      map((r: StrictHttpResponse<ChannelDto>) => r.body as ChannelDto)
    );
  }

  /**
   * Path part for operation channelDeleteProperty
   */
  static readonly ChannelDeletePropertyPath = '/applications/{id}/Channel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `channelDeleteProperty()` instead.
   *
   * This method doesn't expect any request body.
   */
  channelDeleteProperty$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ChannelService.ChannelDeletePropertyPath, 'delete');
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
   * To access the full response (for headers, for example), `channelDeleteProperty$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  channelDeleteProperty(params: {
    id: number;

  }): Observable<Blob> {

    return this.channelDeleteProperty$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
