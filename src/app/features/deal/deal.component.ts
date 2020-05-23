import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DealApiService } from './services/deal-api.service';
import { DealNavigationService } from './services/deal-navigation.service';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {

  dealId: number;

  constructor(
    private route: ActivatedRoute,
    private service: DealApiService,
    private nav: DealNavigationService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      routeData => {
        const dealId = Number(routeData.get('id'));
        this.service.getDeal(dealId).subscribe(
          dealData => this.nav.updateNavTree(dealData, dealId)
        );
      }
    );
  }

}
