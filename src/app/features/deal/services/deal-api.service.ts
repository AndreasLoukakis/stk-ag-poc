import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DealApiService {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.apiUrl;

  getDeal(dealId: number) {
    return this.http.get(`${this.apiUrl}/deals/${dealId}`);
  }

  createDeal() {
    return this.http.post('${this.apiUrl}/deals', {});
  }

  createApplication(dealId: number) {
    return this.http.put(`${this.apiUrl}/deals/${dealId}/application`, {});
  }
}
