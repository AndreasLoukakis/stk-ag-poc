import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { OpenApiParser } from './lib/open-api-parser';

@Injectable({
  providedIn: 'root'
})
export class OpenApiModelService {

  jsonUri = `${environment.apiUrl}/meta/v1/swagger.json`;
  domain: any;

  constructor(private http: HttpClient) {
    this.init();
  }

  async init() {
    this.http.get(this.jsonUri).pipe(take(1)).subscribe(
      data => {
        this.domain = OpenApiParser.fromObject(data);
      }
    );
  }
}
