import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivationStart, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  /**
   * This is just to demonstrate how the router could be used for either route state data or custom data
   * We could even use a resolver, to pass http response data to the component, if that's suitable
   *
   * In a real use case for breadcrumbs, we would use the router to retrieve hierarchical data, with parent
   * and child routes to show a proper breadcrumb.
   */
  breadcrumbs$: Observable<Breadcrumb[]>;
  title: string = 'not set';

  constructor(
    private router: Router,
  ) {
    this.breadcrumbs$ = this.router.events.pipe(
      filter(event => event instanceof ActivationStart),
      distinctUntilChanged(),
      tap((e: ActivationStart) => this.title = e.snapshot.data?.title),
      map((e: ActivationStart) => [{label: e?.snapshot?.data?.breadcrumbs?.label, url: this.router.url}])
    )
  }

  ngOnInit(): void {
  }

}

export interface Breadcrumb {
  url: string,
  label: string
}
