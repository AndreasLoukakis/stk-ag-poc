import { Component, OnInit, Input } from '@angular/core';
import { TableConfig } from '../../../common/table-config.interface';

@Component({
  selector: 'stk-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {

  @Input() item: any;
  @Input() config: TableConfig;
  @Input() columnCount: number;

  expanded = false;

  constructor() { }

  ngOnInit() {
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  parseTemplate(config, item) {
    return config.template(item);
  }

  noTdTemplate(config): boolean {
    return config.tdTemplate === null;
  }

  noTrTemplate(config): boolean {
    return config.trTemplate === null;
  }

  noCellTemplate(config, key): boolean {
    return !config.columns[key].template;
  }

}

