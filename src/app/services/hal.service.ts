import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HalService {

  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getResource(href: string): Observable<any> {
    this.headers = this.headers.set('Accept', 'application/hal+json');
    const rewrittenUrl = href.replace('https://localhost:44319/', '/api/');
    return this.http.get(rewrittenUrl, {headers: this.headers});
  }
}
