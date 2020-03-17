import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResourceProperty } from './../models';


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

  getFormatedResource(href: string, props): Observable<{[key: string]: ResourceProperty}> {
    return this.getResource(href).pipe(map(response => this.formatResource(response, props)));
  }

  formatResource(response: any, props): {[key: string]: ResourceProperty} {

    const lowerCasedProps = props.map(prop => prop.toLowerCase());

    const allProperties = Object.keys(response).reduce((all, current) => {
      if (props.includes(current)) {
        all[current] = this.initPropData(current);
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
      if (Array.isArray(response._links[cur])) {
        response._links[cur].map(valueLink => {
          const propName = this.toCamelCase(valueLink.name);
          if (links[propName]) {
            this.makeResourceData(valueLink, propValues, propName, cur, response, links[propName]);
          }
        });
      } else {
        const propName = this.toCamelCase(response._links[cur].name);
        if (links[propName]) {
          this.makeResourceData(response._links[cur], propValues, propName, cur, response, links[propName]);
        }
      }
      return links;
    }, allProperties);
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

  private makeResourceData(item, propValues, propName, cur, response, prop) {
    prop.isResource = true;
    prop.resourceInfo.currieName = cur;
    prop.resourceInfo.href = item.href;
    prop.resourceInfo.propertyName = propName;
    if (propValues[propName.toLowerCase()]) {
      prop.resourceInfo.values = propValues[propName.toLowerCase()];
    }
    if (response[propName] && response[propName].id) {
      prop.resourceInfo.id = response[propName].id;
    }
    return prop;
  }


  private initPropData(prop: string): ResourceProperty {
    return {
      isResource: false,
      propertyInfo: {
        propertyName: prop
      },
      resourceInfo: {
        propertyName: prop,
      }
    };
  }

  private toCamelCase(str) {
    return `${str.substr( 0, 1 ).toLowerCase()}${str.substr( 1 )}`;
  }
}
