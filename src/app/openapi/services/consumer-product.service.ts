/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ConsumerProductDto } from '../models/consumer-product-dto';

@Injectable({
  providedIn: 'root',
})
export class ConsumerProductService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation consumerProductFindProperty2
   */
  static readonly ConsumerProductFindProperty2Path = '/applications/{id}/ConsumerProduct';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `consumerProductFindProperty2()` instead.
   *
   * This method doesn't expect any request body.
   */
  consumerProductFindProperty2$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<ConsumerProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConsumerProductService.ConsumerProductFindProperty2Path, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ConsumerProductDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `consumerProductFindProperty2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  consumerProductFindProperty2(params: {
    id: number;

  }): Observable<ConsumerProductDto> {

    return this.consumerProductFindProperty2$Response(params).pipe(
      map((r: StrictHttpResponse<ConsumerProductDto>) => r.body as ConsumerProductDto)
    );
  }

  /**
   * Path part for operation consumerProductFindProperty
   */
  static readonly ConsumerProductFindPropertyPath = '/applications/{id}/ConsumerProduct';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `consumerProductFindProperty()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  consumerProductFindProperty$Response(params: {
    id: number;
      body: ConsumerProductDto
  }): Observable<StrictHttpResponse<ConsumerProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConsumerProductService.ConsumerProductFindPropertyPath, 'put');
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
        return r as StrictHttpResponse<ConsumerProductDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `consumerProductFindProperty$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  consumerProductFindProperty(params: {
    id: number;
      body: ConsumerProductDto
  }): Observable<ConsumerProductDto> {

    return this.consumerProductFindProperty$Response(params).pipe(
      map((r: StrictHttpResponse<ConsumerProductDto>) => r.body as ConsumerProductDto)
    );
  }

  /**
   * Path part for operation consumerProductDeleteProperty
   */
  static readonly ConsumerProductDeletePropertyPath = '/applications/{id}/ConsumerProduct';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `consumerProductDeleteProperty()` instead.
   *
   * This method doesn't expect any request body.
   */
  consumerProductDeleteProperty$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ConsumerProductService.ConsumerProductDeletePropertyPath, 'delete');
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
   * To access the full response (for headers, for example), `consumerProductDeleteProperty$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  consumerProductDeleteProperty(params: {
    id: number;

  }): Observable<Blob> {

    return this.consumerProductDeleteProperty$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
