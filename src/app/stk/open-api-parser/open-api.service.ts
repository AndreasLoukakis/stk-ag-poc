import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, merge, Subject } from 'rxjs';
import { tap, map, share, publishReplay, shareReplay } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { OpenApiParser } from './lib/open-api-parser';


@Injectable({
  providedIn: 'root'
})
export class OpenApiModelService {

  private jsonUri = `${environment.apiUrl}/meta/v1/swagger.json`;
  private openStream$: Observable<any> = new Subject<void>().asObservable();
  /**
   * merge with a subject, to keep stream open and not trigger
   * multiple http requests to various subscriptions
   */
  domain$: Observable<OpenApiParser> = merge(
    this.openStream$,
    this.getJson()).pipe(shareReplay(1));

  constructor(private http: HttpClient) { }

  getJson(): Observable<OpenApiParser> {
    return this.http.get(this.jsonUri).pipe(
      map(OpenApiParser.fromObject)
    );
  }
}
