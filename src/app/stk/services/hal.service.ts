import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ResourceData } from '../../models';
import { ResourceInfo, ResourceDataValues } from './../interfaces';


@Injectable({
  providedIn: 'root'
})
export class HalService {

  constructor(private http: HttpClient) { }

  proxyUrl(url) {
    return url;
    // return '/api/' + url.replace('https://localhost:44319/', '').replace('https://localhost:4200/', '');
  }

  updateResource( url: string, data: {[key: string]: any}) {
    url = this.proxyUrl(url);
    return this.http.put(url, data);
  }

  getResource(href: string): Observable<any> {
    href = this.proxyUrl(href);
    return this.http.get(href);
  }

  getResourceValues(resourceInfo: ResourceInfo): Observable<any> {
    return this.http.get<ResourceDataValues>(this.proxyUrl(resourceInfo.values.href))
      .pipe(map(data => this.transformValues(data, resourceInfo.currieName)));
  }

  /**
   *
   * @param resourceInfo: ResourceInfo, using href and values.href if applicable
   * @param resources : Expected resources by the template
   * @param properties : Expected properties by the template
   */
  // getFormatedResource(
  //   resourceInfo: ResourceInfo,
  //   properties: string[] = []): Observable<any> {
  //     return this.getResource(resourceInfo.href)
  //     .pipe(
  //       map(response => this.formatProps(response, properties))
  //     );
  // }

  /**
   *
   * @param resourceInfo: ResourceInfo, using href and values.href if applicable
   * @param resources : Expected resources by the template
   * @param properties : Expected properties by the template
   */
  getFormatedResources(
    resourceInfo: ResourceInfo,
    resources: string[],
    properties: string[] = []): Observable<ResourceData> {
      return this.getResource(this.proxyUrl(resourceInfo.href));
      // .pipe(
      //   map(response => this.formatResources(response, resources, this.formatProps(response, properties)))
      // );
  }

  // formatProps(response: any, props: string[]) {
  //   return Object.keys(response).reduce((all, cur) => {
  //     if (props.includes(cur)) {
  //       all[cur] = response[cur];
  //     }
  //     return all;
  //   }, {});
  // }


  formatResources(response: any, parentInstance: any): {[key: string]: ResourceInfo} {


    /** resources */
    const linkKeys: string[] = response._links ? Object.keys(response._links) : [];

    const valueLinkKeys = linkKeys.filter(link => link.endsWith('.values'));

    const propLinks = linkKeys.filter(link => {
      const name = response._links[link][0]?.name ? response._links[link][0].name :
        response._links[link]?.name ? response._links[link]?.name : undefined;
      return name && !link.endsWith('.values');
    });

    const propValues = this.calculateValueLinks(valueLinkKeys, response);

    return propLinks.reduce((links, cur) => {
      if (response._links[cur] && Array.isArray(response._links[cur])) {
        response._links[cur].map(valueLink => {
          const propName = this.toCamelCase(valueLink.name);
          links[propName] = this.makeResourceData(valueLink, propValues, propName, cur, response, parentInstance);
        });
      } else if (response._links[cur]) {
        const propName = this.toCamelCase(response._links[cur].name);
        links[propName] = this.makeResourceData(response._links[cur], propValues, propName, cur, response, parentInstance);
      }
      return links;
    },
    {});
  }

  private calculateValueLinks(valueLinkKeys, response) {
    return valueLinkKeys.reduce((vals, cur) => {
      if (Array.isArray(response._links[cur])) {
        response._links[cur].map(valueLink => {
          vals[valueLink.name.toLowerCase()] = {
            propertyName: valueLink.name,
            href: valueLink.href,
            currieName: cur
          };
        });
      } else {
        vals[response._links[cur].name.toLowerCase()] = {
          propertyName: response._links[cur].name,
          href: response._links[cur].href,
          currieName: cur
        };
      }
      return vals;
    }, {});
  }

  private makeResourceData(item, propValues, propName, cur, response, parentInstance) {
    const prop: ResourceInfo = {
      currieName: cur,
      href: item.href,
      propertyName: propName,
    };
    if (parentInstance[propName]) {
      prop.classRef = parentInstance[propName].type.replace('ReferenceOf', '');
      prop.valueProp = parentInstance[propName].valueProp;
    }
    if (propValues[propName.toLowerCase()]) {
      prop.values = propValues[propName.toLowerCase()];
    }
    if (response[propName] && response[propName].id) {
      prop.id = response[propName].id;
    }
    return prop;
  }

  transformValues(data, currieName): ResourceDataValues {
    return {
      items: data._embedded[currieName],
      next: data?.links?.next,
      prev: data?.links?.prev,
      first: data?.links?.first,
      last: data?.links?.last
    };
  }

  private toCamelCase(str) {
    return `${str.substr( 0, 1 ).toLowerCase()}${str.substr( 1 )}`;
  }
}