import { Component, OnInit, Input } from '@angular/core';
import { TableConfig } from '../../../common/table-config.interface';


@Component({
  selector: 'stk-row-no-results',
  templateUrl: './row-no-results.component.html',
  styleUrls: ['./row-no-results.component.scss']
})
export class RowNoResultsComponent implements OnInit {

  @Input() columnCount: number;
  @Input() config: TableConfig;

  constructor() { }

  ngOnInit() {
  }

}
