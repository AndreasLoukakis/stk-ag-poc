import { Injectable } from '@angular/core';
import { ResourceInfo, ResourceDataValues } from './../interfaces';
import { UtilsService as Utils } from './utils.service';
import { OpenApiParser } from './../open-api-parser/lib/open-api-parser';

@Injectable({
  providedIn: 'root'
})
export class ResourceHelpersService {

  constructor() { }

  formatResources(response: any, schema: any, model: OpenApiParser): {[key: string]: ResourceInfo} {

    const { valueLinkKeys, propLinkKeys } = this.groupResourceLinks(response);
    const propValues = this.calculateValueLinks(valueLinkKeys, response);

    return propLinkKeys.reduce((links, cur) => {
      if (response._links[cur]) {
        if (Array.isArray(response._links[cur])) {
          response._links[cur].map(valueLink => {
            const propName = Utils.toCamelCase(valueLink.name);
            let prop = this.addResourceBasics(valueLink, cur);
            prop = this.addResourceParentMeta(prop, propName, schema, model);
            prop = this.addResourceValues(prop, propValues, propName);
            prop = this.addResourceValue(prop, propName, response);
            links[propName] = prop;
          });
        } else {
          const propName = Utils.toCamelCase(response._links[cur].name);
          let prop = this.addResourceBasics(response._links[cur], cur);
          prop = this.addResourceParentMeta(prop, propName, schema, model);
          prop = this.addResourceValues(prop, propValues, propName);
          prop = this.addResourceValue(prop, propName, response);
          links[propName] = prop;
        }
      }
      return links;
    },
    {});
  }

  transformCollectionResponse(data, currieName): ResourceDataValues {
    return {
      items: data._embedded[currieName],
      next: data?.links?.next,
      prev: data?.links?.prev,
      first: data?.links?.first,
      last: data?.links?.last
    };
  }

  private calculateValueLinks(valueLinkKeys, response) {
    return valueLinkKeys.reduce((vals, cur) => {
      Array.isArray(response._links[cur]) ?
        response._links[cur].map(valueLink => {
          vals[valueLink.name.toLowerCase()] = this.addResourceBasics(valueLink, cur);
        }) :
        vals[response._links[cur].name.toLowerCase()] = this.addResourceBasics(response._links[cur], cur);
      return vals;
    }, {});
  }

  private addResourceValue(prop, propName, response) {
    if (response[propName] && response[propName].id) {
      prop.id = response[propName].id;
    }
    return prop;
  }

  private groupResourceLinks(response: any): { valueLinkKeys: any; propLinkKeys: any; } {
    const  linkKeys = response._links ? Object.keys(response._links) : [];
    return {
      valueLinkKeys: linkKeys.filter(link => link.endsWith('.values')),
      propLinkKeys: linkKeys.filter(link => {
        const name = response._links[link][0]?.name ? response._links[link][0].name :
          response._links[link]?.name ? response._links[link]?.name : undefined;
        return name && !link.endsWith('.values');
      })
    };
  }

  private addResourceValues(prop, propValues, propName) {
    if (propValues[propName.toLowerCase()]) {
      prop.values = propValues[propName.toLowerCase()];
    }
    return prop;
  }

  private addResourceParentMeta(prop, propName, schema, model: OpenApiParser) {
    const property = schema.properties.find( p => p.name.toLowerCase() === propName.toLowerCase() );

    if (property) {
      prop.classRef = property.types[0].replace('ReferenceOf', '');
      prop.valueProp = model.schema(property.types[0]).properties[0].name;
      prop.meta = property.allMeta;
    }
    return prop;
  }

  private addResourceBasics(link, currie) {
    return {
      propertyName: link.name,
      href: link.href,
      currieName: currie
    };
  }
}
