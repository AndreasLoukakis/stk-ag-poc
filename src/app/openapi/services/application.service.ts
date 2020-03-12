/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ApplicationDto } from '../models/application-dto';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation applicationFindProperty2
   */
  static readonly ApplicationFindProperty2Path = '/deals/{id}/Application';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `applicationFindProperty2()` instead.
   *
   * This method doesn't expect any request body.
   */
  applicationFindProperty2$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<ApplicationDto>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationService.ApplicationFindProperty2Path, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApplicationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `applicationFindProperty2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  applicationFindProperty2(params: {
    id: number;

  }): Observable<ApplicationDto> {

    return this.applicationFindProperty2$Response(params).pipe(
      map((r: StrictHttpResponse<ApplicationDto>) => r.body as ApplicationDto)
    );
  }

  /**
   * Path part for operation applicationFindProperty
   */
  static readonly ApplicationFindPropertyPath = '/deals/{id}/Application';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `applicationFindProperty()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  applicationFindProperty$Response(params: {
    id: number;
      body: ApplicationDto
  }): Observable<StrictHttpResponse<ApplicationDto>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationService.ApplicationFindPropertyPath, 'put');
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
        return r as StrictHttpResponse<ApplicationDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `applicationFindProperty$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  applicationFindProperty(params: {
    id: number;
      body: ApplicationDto
  }): Observable<ApplicationDto> {

    return this.applicationFindProperty$Response(params).pipe(
      map((r: StrictHttpResponse<ApplicationDto>) => r.body as ApplicationDto)
    );
  }

  /**
   * Path part for operation applicationDeleteProperty
   */
  static readonly ApplicationDeletePropertyPath = '/deals/{id}/Application';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `applicationDeleteProperty()` instead.
   *
   * This method doesn't expect any request body.
   */
  applicationDeleteProperty$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationService.ApplicationDeletePropertyPath, 'delete');
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
   * To access the full response (for headers, for example), `applicationDeleteProperty$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  applicationDeleteProperty(params: {
    id: number;

  }): Observable<Blob> {

    return this.applicationDeleteProperty$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
