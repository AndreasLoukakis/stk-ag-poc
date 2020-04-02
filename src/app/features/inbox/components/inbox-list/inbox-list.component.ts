import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComplexBaseComponent } from './../../../../stk/abstract/complex-base-component';
import { ApiService } from '../../../../stk/services/api.service';
import { ListConfig, listTypes } from 'stk-lists';
import { DealsService } from './../../services/deals.service';

@Component({
  selector: 'app-inbox-list',
  templateUrl: './inbox-list.component.html',
  styleUrls: ['./inbox-list.component.scss']
})
export class InboxListComponent extends ComplexBaseComponent implements OnInit {

  @ViewChild('itemTpl') itemTpl: ElementRef<any>;

  listConfig: ListConfig = {
    listType: listTypes.data,
    itemTemplate: this.itemTpl,
  };

  deals$: Observable<any[]>;

  constructor(
    api: ApiService,
    private service: DealsService
  ) { super(api); }

  ngOnInit() {
    this.deals$ = this.service.getDeals();
  }

}
