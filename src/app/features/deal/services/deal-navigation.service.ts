import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ResourceInfo } from './../../../stk/interfaces';
import { TranslateService as Lang} from './../../../stk/services/translate.service';
import { UtilsService } from 'src/app/stk/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class DealNavigationService {

  currentBreadcrumb: any;

  private navTreeChanges: BehaviorSubject<NavItem[]> = new BehaviorSubject([]);
  navTree$ = this.navTreeChanges.asObservable();

  knownNavs = [
    {key: 'ag:application', collection: false},
    {key: 'ag:dealParties', collection: true},
  ];

  updateNavTree(response: any, dealId: number): void {
    this.navTreeChanges.next(
      this.knownNavs.map(({key, collection}) => {

        if (response._links[key]) {
          const answer = collection ?
            this.getCollectionNav(response, key, dealId) :
            this.getSimpleNav(response, key, dealId);
          return answer;
        }
    }));
  }

  getCollectionNav(response, key, dealId): NavItem {

    const topLevel = this.getSimpleNav(response, key, dealId);
    const specializations = Object.keys(response._embedded[key]._links)
      .filter(item => item !== 'self');
    const embedded = response._embedded[key]._embedded;
    topLevel.children = specializations.map(specialization => {

      return {
        href: '#',
        title: Lang.translate(specialization),
        children: embedded[specialization]._embedded[specialization].map(
          item => {
            const linkKey = Object.keys(item._links)[0];
            return {
              href: specialization.split(':')[1],
              title: 'temp title',
              state: {
                href: item._links[linkKey],
                propertyName: 'elante',
                currieName: linkKey,
                classRef: UtilsService.nameToClass(linkKey.split(':')[1]) + 'Dto',
                valueProp: 'id', // should get this from proper schema
                dealId,
                id: item.id || undefined
              }
            };
          }
        )
      };
    });

    return topLevel;

  }

  getSimpleNav(response, key, dealId): NavItem {
    const [currie, keyName] = key.split(':');
    return {
      href: keyName.toLowerCase(),
      title: Lang.translate(keyName),
      state: {
        href: response._links[key].href,
        propertyName: keyName,
        currieName: key,
        classRef: response._links[key].name ? response._links[key].name + 'Dto' : UtilsService.nameToClass(key.split(':')[1]) + 'Dto',
        valueProp: 'id', // should get this from proper schema
        dealId,
        id: response[keyName]?.id || undefined
      }
    };
  }
}

export interface NavItem {
  href?: string;
  title: string;
  params?: string[];
  state?: ResourceInfo;
  children?: NavItem[];
}


