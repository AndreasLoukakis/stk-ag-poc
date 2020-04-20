import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResourceHelpersService } from './resource-helpers.service';
import { ResourceInfo, ResourceDataValues } from './../interfaces';


@Injectable({
  providedIn: 'root'
})
export class HalService {

  constructor(
    private http: HttpClient,
    private resourceHelpers: ResourceHelpersService
  ) { }

  updateResource( url: string, data: {[key: string]: any}) {
    return this.http.put(url, data);
  }

  getResource(href: string): Observable<any> {
    return this.http.get(href);
  }

  getResourceValues(resourceInfo: ResourceInfo): Observable<any> {
    return this.http.get<ResourceDataValues>(resourceInfo.values.href)
      .pipe(map(data => this.resourceHelpers.transformCollectionResponse(data, resourceInfo.currieName)));
  }

}
