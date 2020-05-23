import { Component, OnInit, Input } from '@angular/core';
import { TableConfig } from '../../../common/table-config.interface';

@Component({
  selector: 'stk-thead',
  templateUrl: './thead.component.html',
  styleUrls: ['./thead.component.scss']
})
export class TheadComponent implements OnInit {

  @Input() config: TableConfig;
  @Input() sortDirection: 'asc' | 'desc';
  @Input() sortedBy: string | null;

  constructor() { }

  ngOnInit() {
  }

  getLabel(col) {
    return typeof col === 'string' ? col : col.label;
  }

}
