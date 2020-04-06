import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComplexBaseComponent } from './../../../../stk/abstract/complex-base-component';
import { ApiService } from './../../../../stk/services/api.service';
import { DealApiService } from './../../services/deal-api.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  providers: [{provide: ComplexBaseComponent, useExisting: ApplicationComponent}]
})
export class ApplicationComponent extends ComplexBaseComponent implements OnInit {

  currentDealId: number;

  constructor(
    protected api: ApiService,
    private route: ActivatedRoute
  ) { super(api); }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      routeData => {
        this.currentDealId = +Number(routeData.get('id'));
      }
    );
  }


}
