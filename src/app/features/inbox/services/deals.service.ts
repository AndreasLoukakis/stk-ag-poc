import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  constructor(private http: HttpClient) { }

  getDeals(): Observable<any[]> {
    return this.http.get<DealsListResponse>('http://apigateway-trunk.relationalfs.com/deals').pipe(
      map(response => response._embedded.deals)
    );
  }

  createDeal() {
    return this.http.post('http://apigateway-trunk.relationalfs.com/deals', {});
  }
}

export interface DealsListResponse {
  _links: { [key: string]: any };
  _embedded: {
    deals: any[]
  };
}
