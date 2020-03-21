import { Component, OnInit } from '@angular/core';
import { ResourceInfo } from './../../../models';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {

  resourceInfo: ResourceInfo = {
    href: 'http://apigateway-trunk.relationalfs.com/deals/1/application',
    propertyName: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

}
