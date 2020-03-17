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
          const propName = props.find(prop => prop.toLowerCase() === valueLink.name.toLowerCase());
          if (propName) {
            links[propName] = this.setupProp(valueLink, propValues, propName, cur);
          }
        });
      } else {
        const propName = props.find(prop => prop.toLowerCase() === response._links[cur].name.toLowerCase());
        if (propName) {
          links[propName] = this.setupProp(response._links[cur], propValues, propName, cur);
        }
      }
      return links;
    }, {});

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

  private setupProp(item, propValues, propName, cur) {
    const prop = this.initPropData(propName);
    prop.isResource = true;
    prop.renderInfo.currieName = cur;
    prop.renderInfo.href = item.href;
    prop.renderInfo.propertyName = propName;
    if (propValues[propName.toLowerCase()]) {
      prop.renderInfo.values = propValues[propName.toLowerCase()];
    }
    return prop;
  }


  private initPropData(prop: string): ResourceProperty {
    return {
      isResource: false,
      displayInfo: {},
      renderInfo: {
        propertyName: prop,
        href: undefined,
      }
    };
  }
}
