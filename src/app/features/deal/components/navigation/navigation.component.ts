import { Component, OnInit } from '@angular/core';
import { DealNavigationService, NavItem } from './../../services/deal-navigation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  navTree$: Observable<NavItem[]>;
  constructor(private nav: DealNavigationService) { }

  ngOnInit(): void {
    this.navTree$ = this.nav.navTree$;
  }

}
