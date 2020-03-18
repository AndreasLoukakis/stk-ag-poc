import { Component, OnInit } from '@angular/core';
import { LazyBase } from './../lazy-base';
import { OpenapiService } from './../../../services/openapi.service';
import { HalService } from './../../../services/hal.service';

@Component({
  selector: 'app-consumer-product',
  templateUrl: './consumer-product.component.html',
  styleUrls: ['./consumer-product.component.scss']
})
export class ConsumerProductComponent extends LazyBase implements OnInit {

  constructor(
    openapiService: OpenapiService,
    halService: HalService
  ) { super(openapiService, halService); }

  ngOnInit(): void {
  }

}
