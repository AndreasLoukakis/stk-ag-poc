import { Component, OnInit } from '@angular/core';
import { PaginationData } from './../common/interfaces/pagination-data.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  paginationData: PaginationData;
  constructor() { }

  ngOnInit(): void {
  }

}
