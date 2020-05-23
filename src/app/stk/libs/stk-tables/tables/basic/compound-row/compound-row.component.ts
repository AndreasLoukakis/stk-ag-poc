import { Component, OnInit, Input } from '@angular/core';
import { TableConfig } from '../../../common/table-config.interface';

@Component({
  selector: 'stk-compound-row',
  templateUrl: './compound-row.component.html',
  styleUrls: ['./compound-row.component.scss']
})
export class CompoundRowComponent implements OnInit {

  @Input() item: any;
  @Input() config: TableConfig;

  expanded = false;
  expandedCompound: string;
  columnCount = 0;

  constructor() { }

  ngOnInit() {
    this.columnCount = this.config.expandable ?
      Object.keys(this.config.columns).length :
      Object.keys(this.config.columns).length - 1;

  }

  isArray(val): boolean {
    return Array.isArray(val);
  }

  setExpandedCompound(columnKey: string): void {
    this.expandedCompound = this.expandedCompound === columnKey ? undefined : columnKey;
  }

}
