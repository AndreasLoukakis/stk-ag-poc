import { Component, OnInit, Input } from '@angular/core';

import { ListConfig } from '../../../../common/interfaces/listconfig.interface';

@Component({
  selector: 'stk-data-list-item',
  templateUrl: './data-list-item.component.html',
  styleUrls: ['./data-list-item.component.scss']
})
export class DataListItemComponent implements OnInit {

  /**
   * An iterable object (Array, Object, Set or Map)
   */
  @Input() item: {any};

  @Input() config: ListConfig;

  expanded = false;

  constructor() { }

  ngOnInit() { }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

}
