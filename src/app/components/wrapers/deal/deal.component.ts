import { Component, OnInit } from '@angular/core';
import { ResourceInfo } from './../../../stk/interfaces';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {

  resourceInfo: ResourceInfo = {
    href: 'http://apigateway-trunk.relationalfs.com/deals/1/application',
    // href: 'https://localhost:44319/deals/2/application',
    propertyName: 'application',
    currieName: '',
    classRef: 'ApplicationDto',
    valueProp: 'id',
    id: 2

  };

  constructor() { }

  ngOnInit(): void {
  }

}
