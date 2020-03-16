import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HalService } from './../../services/hal.service';
import { OpenapiService  } from './../../services/openapi.service';
import { ResourceProperty } from './../../models';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  @Input() resourceName: string;
  @Input() href: string;

  resourceData$: Observable<{[key: string]: ResourceProperty}>;

  propPlaceholders: string[] = [
    'channel', 'branch', 'branchOther', 'loanType', 'consumerProduct'
  ];

  constructor(
    private hal: HalService,
    private openapi: OpenapiService
  ) { }

  ngOnInit(): void {
    this.resourceData$ = this.hal.getResource(this.href).pipe(map(this.formatResource.bind(this)));
  }

  formatResource(response: any): {[key: string]: ResourceProperty} {

    const lowerCasedProps = this.propPlaceholders.map(prop => prop.toLowerCase());
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
          const propName = this.propPlaceholders.find(prop => prop.toLowerCase() === valueLink.name.toLowerCase());
          if (propName) {
            links[propName] = this.setupProp(valueLink, propValues, propName, cur);
          }
        });
      } else {
        const propName = this.propPlaceholders.find(prop => prop.toLowerCase() === response._links[cur].name.toLowerCase());
        if (propName) {
          links[propName] = this.setupProp(response._links[cur], propValues, propName, cur);
        }
      }
      return links;
    }, {});

  }

  calculateValueLinks(response, valueLinkKeys) {
    valueLinkKeys.reduce((vals, cur) => {
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

  setupProp(item, propValues, propName, cur) {
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


  initPropData(prop: string): ResourceProperty {
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


