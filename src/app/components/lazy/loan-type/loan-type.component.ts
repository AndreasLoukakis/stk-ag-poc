import { Component, OnInit } from '@angular/core';
import { LazyBase } from './../lazy-base';
import { OpenapiService } from './../../../services/openapi.service';
import { HalService } from './../../../services/hal.service';

@Component({
  selector: 'app-loan-type',
  templateUrl: './loan-type.component.html',
  styleUrls: ['./loan-type.component.scss']
})
export class LoanTypeComponent extends LazyBase implements OnInit {

  constructor(
    openapiService: OpenapiService,
    halService: HalService
  ) { super(openapiService, halService); }

  ngOnInit(): void {
  }

}
