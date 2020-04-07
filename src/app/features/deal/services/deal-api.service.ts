import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DealApiService {

  constructor(private http: HttpClient) { }

  getDeal(dealId: number) {
    return this.http.get(`http://apigateway-trunk.relationalfs.com/deals/${dealId}`);
  }

  createDeal() {
    return this.http.post('http://apigateway-trunk.relationalfs.com/deals', {});
  }

  createApplication(dealId: number) {
    return this.http.put(`http://apigateway-trunk.relationalfs.com/deals/${dealId}/application`, {});
  }
}
