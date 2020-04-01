import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const reqWithHeaders = request.clone({
      url: request.url,
      headers: this.addExtraHeaders(request.headers)
    });
    return next.handle(reqWithHeaders);
  }

  private addExtraHeaders(headers: HttpHeaders): HttpHeaders {
    headers = headers.append('Accept', 'application/hal+json, application/*+json');
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }
}
