import { Component, OnInit, Input } from '@angular/core';
import { NavItem } from './../../services/deal-navigation.service';

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent implements OnInit {

  @Input() item: NavItem;
  navItemExpanded = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavItemExpanded() {
    this.navItemExpanded = !this.navItemExpanded;
  }

}
