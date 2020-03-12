/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { DealPartyRoleTypeDto } from '../models/deal-party-role-type-dto';
import { PagedOfDealPartyRoleTypeDto } from '../models/paged-of-deal-party-role-type-dto';

@Injectable({
  providedIn: 'root',
})
export class DealPartyRoleTypeService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation dealPartyRoleTypeSearch
   */
  static readonly DealPartyRoleTypeSearchPath = '/deal-party-roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dealPartyRoleTypeSearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  dealPartyRoleTypeSearch$Response(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<StrictHttpResponse<PagedOfDealPartyRoleTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, DealPartyRoleTypeService.DealPartyRoleTypeSearchPath, 'get');
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
        return r as StrictHttpResponse<PagedOfDealPartyRoleTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `dealPartyRoleTypeSearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dealPartyRoleTypeSearch(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<PagedOfDealPartyRoleTypeDto> {

    return this.dealPartyRoleTypeSearch$Response(params).pipe(
      map((r: StrictHttpResponse<PagedOfDealPartyRoleTypeDto>) => r.body as PagedOfDealPartyRoleTypeDto)
    );
  }

  /**
   * Path part for operation dealPartyRoleTypeFind
   */
  static readonly DealPartyRoleTypeFindPath = '/deal-party-roles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dealPartyRoleTypeFind()` instead.
   *
   * This method doesn't expect any request body.
   */
  dealPartyRoleTypeFind$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<DealPartyRoleTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, DealPartyRoleTypeService.DealPartyRoleTypeFindPath, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DealPartyRoleTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `dealPartyRoleTypeFind$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dealPartyRoleTypeFind(params: {
    id: number;

  }): Observable<DealPartyRoleTypeDto> {

    return this.dealPartyRoleTypeFind$Response(params).pipe(
      map((r: StrictHttpResponse<DealPartyRoleTypeDto>) => r.body as DealPartyRoleTypeDto)
    );
  }

}
