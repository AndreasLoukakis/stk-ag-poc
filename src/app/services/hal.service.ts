import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResourceInfo, ResourceData, ResourceDataValues } from './../models';


@Injectable({
  providedIn: 'root'
})
export class HalService {

  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  private proxyUrl(url: string): string {
    return url.replace('https://localhost:44319/', '/api/').replace('https://localhost:4200/', '/api/');
  }

  getResource(href: string): Observable<any> {
    // const viaProxy = this.proxyUrl(href);
    this.headers = this.headers.set('Accept', 'application/hal+json');
    return this.http.get(href, {headers: this.headers});
  }

  getResourceValues(values: {href: string}): Observable<ResourceDataValues> {
    return this.http.get<ResourceDataValues>(values.href, {headers: this.headers.set('Accept', 'application/hal+json')});
  }

  /**
   *
   * @param resourceInfo: ResourceInfo, using href and values.href if applicable
   * @param resources : Expected resources by the template
   * @param properties : Expected properties by the template
   */
  getFormatedResource(
    resourceInfo: ResourceInfo,
    resources: string[],
    properties: string[] = []): Observable<ResourceData> {
      return this.getResource(resourceInfo.href).pipe(
        map(response => this.formatResource(response, resources, properties))
      );
  }

  /**
   *
   * @param response: any
   * @param resources: string[]
   */
  formatResource(response: any, resources, properties): ResourceData {

    const lowerCasedProps = resources.map(resource => resource.toLowerCase());
    const onwData = Object.keys(response).reduce((all, cur) => {
      if (properties.includes(cur)) {
        all[cur] = response[cur];
      }
      return all;
    }, {});

    /** resources */
    const linkKeys: string[] = Object.keys(response._links);
    const valueLinkKeys = linkKeys.filter(link => link.endsWith('.values'));
    const propLinks = linkKeys.filter(link => {
      const name = response._links[link][0]?.name ? response._links[link][0].name :
        response._links[link]?.name ? response._links[link]?.name : undefined;
      return name && !link.endsWith('.values') && lowerCasedProps.includes(name.toLowerCase());
    });

    const propValues = this.calculateValueLinks(valueLinkKeys, response);

    return propLinks.reduce((links, cur) => {
      if (response._links[cur] && Array.isArray(response._links[cur])) {
        response._links[cur].map(valueLink => {
          const propName = this.toCamelCase(valueLink.name);
          links.resources[propName] = this.makeResourceData(valueLink, propValues, propName, cur, response);
        });
      } else if (response._links[cur]) {
        const propName = this.toCamelCase(response._links[cur].name);
        links.resources[propName] = this.makeResourceData(response._links[cur], propValues, propName, cur, response);
      }
      return links;
    },
    {
      properties: onwData,
      resources: {}
    });
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

  private makeResourceData(item, propValues, propName, cur, response) {
    const prop: ResourceInfo = {
      currieName: cur,
      href: item.href,
      propertyName: propName
    };
    if (propValues[propName.toLowerCase()]) {
      prop.values = propValues[propName.toLowerCase()];
    }
    if (response[propName] && response[propName].id) {
      prop.id = response[propName].id;
    }
    return prop;
  }


  private toCamelCase(str) {
    return `${str.substr( 0, 1 ).toLowerCase()}${str.substr( 1 )}`;
  }
}
