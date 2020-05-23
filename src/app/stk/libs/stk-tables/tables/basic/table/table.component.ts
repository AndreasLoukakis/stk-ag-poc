import { Component, OnInit, Input } from '@angular/core';
import { TableConfig, defaultTableConfig } from '../../../common/table-config.interface';

@Component({
  selector: 'stk-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  /**
   * TODO: implement:
   * --sorting local data
   * --sorting remote data (emit event with query params?)
   * --pagination integration
   */

  @Input() items: any[];
  @Input() config: TableConfig;

  sortedBy: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  columnCount = 0;

  constructor() { }

  ngOnInit() {
    this.config = { ...defaultTableConfig, ...this.config,
      columns: {...defaultTableConfig.columns, ...this.config.columns || {}}
    };

    this.sortedBy = this.config.sortDefault;
    this.columnCount = this.config.expandable ?
      Object.keys(this.config.columns).length :
      Object.keys(this.config.columns).length - 1;

  }

  calcTableClass() {
    if (!this.config) {
      return;
    }
    const tmp = 'pf-m-grid-' + this.config.breakpoint;
    return this.config.compact ? 'pf-m-compact ' + tmp : tmp;
  }


}
