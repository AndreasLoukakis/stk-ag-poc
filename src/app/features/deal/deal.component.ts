import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResourceInfo } from './../../stk/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit, AfterViewInit {

  resourceInfo: ResourceInfo;
  formgroup: FormGroup = new FormGroup({});
  formData$: Observable<string>;

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

  ngAfterViewInit(): void {
    this.formData$ = this.formgroup.statusChanges;
  }

}
