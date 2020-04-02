import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceInfo } from './../../stk/interfaces';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {

  resourceInfo: ResourceInfo;

  dealId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      routeData => {
        const dealId = +Number(routeData.get('id'));
        this.resourceInfo = {
          href: `http://apigateway-trunk.relationalfs.com/deals/${dealId}/application`,
          propertyName: 'application',
          currieName: '',
          classRef: 'ApplicationDto',
          valueProp: 'id',
          id: dealId
        };
      }
    );
  }

}
