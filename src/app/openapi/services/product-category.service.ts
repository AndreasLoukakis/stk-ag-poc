/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PagedOfProductCategoryDto } from '../models/paged-of-product-category-dto';
import { ProductCategoryDto } from '../models/product-category-dto';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation productCategorySearch
   */
  static readonly ProductCategorySearchPath = '/productCategories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `productCategorySearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  productCategorySearch$Response(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<StrictHttpResponse<PagedOfProductCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductCategoryService.ProductCategorySearchPath, 'get');
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
        return r as StrictHttpResponse<PagedOfProductCategoryDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `productCategorySearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  productCategorySearch(params?: {
    pageIndex?: number;
    pageSize?: number;

  }): Observable<PagedOfProductCategoryDto> {

    return this.productCategorySearch$Response(params).pipe(
      map((r: StrictHttpResponse<PagedOfProductCategoryDto>) => r.body as PagedOfProductCategoryDto)
    );
  }

  /**
   * Path part for operation productCategoryFind
   */
  static readonly ProductCategoryFindPath = '/productCategories/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `productCategoryFind()` instead.
   *
   * This method doesn't expect any request body.
   */
  productCategoryFind$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<ProductCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductCategoryService.ProductCategoryFindPath, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductCategoryDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `productCategoryFind$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  productCategoryFind(params: {
    id: number;

  }): Observable<ProductCategoryDto> {

    return this.productCategoryFind$Response(params).pipe(
      map((r: StrictHttpResponse<ProductCategoryDto>) => r.body as ProductCategoryDto)
    );
  }

  /**
   * Path part for operation productCategoryFindProperty2
   */
  static readonly ProductCategoryFindProperty2Path = '/consumerProducts/{id}/ProductCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `productCategoryFindProperty2()` instead.
   *
   * This method doesn't expect any request body.
   */
  productCategoryFindProperty2$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<ProductCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductCategoryService.ProductCategoryFindProperty2Path, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductCategoryDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `productCategoryFindProperty2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  productCategoryFindProperty2(params: {
    id: number;

  }): Observable<ProductCategoryDto> {

    return this.productCategoryFindProperty2$Response(params).pipe(
      map((r: StrictHttpResponse<ProductCategoryDto>) => r.body as ProductCategoryDto)
    );
  }

  /**
   * Path part for operation productCategoryFindProperty
   */
  static readonly ProductCategoryFindPropertyPath = '/consumerProducts/{id}/ProductCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `productCategoryFindProperty()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  productCategoryFindProperty$Response(params: {
    id: number;
      body: ProductCategoryDto
  }): Observable<StrictHttpResponse<ProductCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductCategoryService.ProductCategoryFindPropertyPath, 'put');
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
        return r as StrictHttpResponse<ProductCategoryDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `productCategoryFindProperty$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  productCategoryFindProperty(params: {
    id: number;
      body: ProductCategoryDto
  }): Observable<ProductCategoryDto> {

    return this.productCategoryFindProperty$Response(params).pipe(
      map((r: StrictHttpResponse<ProductCategoryDto>) => r.body as ProductCategoryDto)
    );
  }

  /**
   * Path part for operation productCategoryDeleteProperty
   */
  static readonly ProductCategoryDeletePropertyPath = '/consumerProducts/{id}/ProductCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `productCategoryDeleteProperty()` instead.
   *
   * This method doesn't expect any request body.
   */
  productCategoryDeleteProperty$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ProductCategoryService.ProductCategoryDeletePropertyPath, 'delete');
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
   * To access the full response (for headers, for example), `productCategoryDeleteProperty$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  productCategoryDeleteProperty(params: {
    id: number;

  }): Observable<Blob> {

    return this.productCategoryDeleteProperty$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation productCategoryFindProperty23
   */
  static readonly ProductCategoryFindProperty23Path = '/mortgageProducts/{id}/ProductCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `productCategoryFindProperty23()` instead.
   *
   * This method doesn't expect any request body.
   */
  productCategoryFindProperty23$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<ProductCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductCategoryService.ProductCategoryFindProperty23Path, 'get');
    if (params) {

      rb.path('Id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductCategoryDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `productCategoryFindProperty23$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  productCategoryFindProperty23(params: {
    id: number;

  }): Observable<ProductCategoryDto> {

    return this.productCategoryFindProperty23$Response(params).pipe(
      map((r: StrictHttpResponse<ProductCategoryDto>) => r.body as ProductCategoryDto)
    );
  }

  /**
   * Path part for operation productCategoryFindProperty22
   */
  static readonly ProductCategoryFindProperty22Path = '/mortgageProducts/{id}/ProductCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `productCategoryFindProperty22()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  productCategoryFindProperty22$Response(params: {
    id: number;
      body: ProductCategoryDto
  }): Observable<StrictHttpResponse<ProductCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductCategoryService.ProductCategoryFindProperty22Path, 'put');
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
        return r as StrictHttpResponse<ProductCategoryDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `productCategoryFindProperty22$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  productCategoryFindProperty22(params: {
    id: number;
      body: ProductCategoryDto
  }): Observable<ProductCategoryDto> {

    return this.productCategoryFindProperty22$Response(params).pipe(
      map((r: StrictHttpResponse<ProductCategoryDto>) => r.body as ProductCategoryDto)
    );
  }

  /**
   * Path part for operation productCategoryDeleteProperty2
   */
  static readonly ProductCategoryDeleteProperty2Path = '/mortgageProducts/{id}/ProductCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `productCategoryDeleteProperty2()` instead.
   *
   * This method doesn't expect any request body.
   */
  productCategoryDeleteProperty2$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ProductCategoryService.ProductCategoryDeleteProperty2Path, 'delete');
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
   * To access the full response (for headers, for example), `productCategoryDeleteProperty2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  productCategoryDeleteProperty2(params: {
    id: number;

  }): Observable<Blob> {

    return this.productCategoryDeleteProperty2$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
