/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BorrowerRoleTypeDto } from '../models/borrower-role-type-dto';
import { PagedOfBorrowerRoleTypeDto } from '../models/paged-of-borrower-role-type-dto';

@Injectable({
  providedIn: 'root',
})
export class BorrowerRoleTypeService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation borrowerRoleTypeSearch
   */
  static readonly BorrowerRoleTypeSearchPath = '/borrower-roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `borrowerRoleTypeSearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowerRoleTypeSearch$Response(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<StrictHttpResponse<PagedOfBorrowerRoleTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, BorrowerRoleTypeService.BorrowerRoleTypeSearchPath, 'get');
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
        return r as StrictHttpResponse<PagedOfBorrowerRoleTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `borrowerRoleTypeSearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowerRoleTypeSearch(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<PagedOfBorrowerRoleTypeDto> {

    return this.borrowerRoleTypeSearch$Response(params).pipe(
      map((r: StrictHttpResponse<PagedOfBorrowerRoleTypeDto>) => r.body as PagedOfBorrowerRoleTypeDto)
    );
  }

  /**
   * Path part for operation borrowerRoleTypeFind
   */
  static readonly BorrowerRoleTypeFindPath = '/borrower-roles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `borrowerRoleTypeFind()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowerRoleTypeFind$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<BorrowerRoleTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, BorrowerRoleTypeService.BorrowerRoleTypeFindPath, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BorrowerRoleTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `borrowerRoleTypeFind$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowerRoleTypeFind(params: {
    id: number;

  }): Observable<BorrowerRoleTypeDto> {

    return this.borrowerRoleTypeFind$Response(params).pipe(
      map((r: StrictHttpResponse<BorrowerRoleTypeDto>) => r.body as BorrowerRoleTypeDto)
    );
  }

}
