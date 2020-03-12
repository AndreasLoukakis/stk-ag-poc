/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { IRelationExtensionInformation } from '../models/i-relation-extension-information';

@Injectable({
  providedIn: 'root',
})
export class LinkRelationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation linkRelationFind
   */
  static readonly LinkRelationFindPath = '/relations/{rel}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `linkRelationFind()` instead.
   *
   * This method doesn't expect any request body.
   */
  linkRelationFind$Response(params: {
    rel: null | string;

  }): Observable<StrictHttpResponse<IRelationExtensionInformation>> {

    const rb = new RequestBuilder(this.rootUrl, LinkRelationService.LinkRelationFindPath, 'get');
    if (params) {

      rb.path('Rel', params.rel);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IRelationExtensionInformation>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `linkRelationFind$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  linkRelationFind(params: {
    rel: null | string;

  }): Observable<IRelationExtensionInformation> {

    return this.linkRelationFind$Response(params).pipe(
      map((r: StrictHttpResponse<IRelationExtensionInformation>) => r.body as IRelationExtensionInformation)
    );
  }

}
