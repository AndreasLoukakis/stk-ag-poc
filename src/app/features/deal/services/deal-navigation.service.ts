import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResourceInfo } from './../../../stk/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DealNavigationService {

  currentBreadcrumb: any;

  // or use BehaviourSubject and emit an initial value
  private navTreeChanges = new BehaviorSubject([]);
  navTree$ = this.navTreeChanges.asObservable();

  updateNavTree(links: any, dealId: number): void {
    this.navTreeChanges.next([
      {
        href: 'application',
        title: 'Application',
        state: {
          href: `http://apigateway-trunk.relationalfs.com/deals/${dealId}/application`,
          propertyName: 'application',
          currieName: '',
          classRef: 'ApplicationDto',
          valueProp: 'id',
          dealId,
          id: links.application ? links.application.id : undefined
        }
      },
      {
        href: 'parties',
        title: 'Parties',
        state: {
          href: `http://apigateway-trunk.relationalfs.com/deals/${dealId}/application`,
          propertyName: 'application',
          currieName: '',
          classRef: 'ApplicationDto',
          valueProp: 'id',
        }
      }
    ]);
  }
}

export interface NavItem {
  href?: string;
  title: string;
  params?: string[];
  state: ResourceInfo;
  children?: NavItem[];
}


