import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

import { ComplexBaseComponent } from './../../../../stk/abstract/complex-base-component';
import { ApiService } from './../../../../stk/services/api.service';
import { ResourceInfo } from 'src/app/stk/interfaces';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.scss'],
  providers: [{provide: ComplexBaseComponent, useExisting: PartiesComponent}]
})
export class PartiesComponent extends ComplexBaseComponent {

  constructor(
    protected api: ApiService,
    private router: Router,
  ) {
    super(api);
    this.setContext();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
      )
      .subscribe(routeEvent => {
        const navigation = router.getCurrentNavigation();
        this.renderInfo = navigation.extras.state as ResourceInfo;
        this.setContext();
      });
  }


}
