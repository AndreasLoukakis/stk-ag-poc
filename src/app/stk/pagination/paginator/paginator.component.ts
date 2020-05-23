import { Component, OnInit, Input } from '@angular/core';
import { PaginationData } from './../common/interfaces/pagination-data.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() config: PaginationConfig;

  constructor() { }

  ngOnInit() {
    this.config = { ...defaultPaginationconfig, ...this.config };
  }

}

export interface PaginationConfig {
  isHeader: boolean;
  isFooter: boolean;
}

export const defaultPaginationconfig = {
  isHeader: false,
  isFooter: false
};
