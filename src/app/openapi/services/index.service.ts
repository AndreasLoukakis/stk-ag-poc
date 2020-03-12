/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { IndexDto } from '../models/index-dto';

@Injectable({
  providedIn: 'root',
})
export class IndexService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation indexRoot
   */
  static readonly IndexRootPath = '/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `indexRoot()` instead.
   *
   * This method doesn't expect any request body.
   */
  indexRoot$Response(params?: {

  }): Observable<StrictHttpResponse<IndexDto>> {

    const rb = new RequestBuilder(this.rootUrl, IndexService.IndexRootPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IndexDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `indexRoot$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  indexRoot(params?: {

  }): Observable<IndexDto> {

    return this.indexRoot$Response(params).pipe(
      map((r: StrictHttpResponse<IndexDto>) => r.body as IndexDto)
    );
  }

}
