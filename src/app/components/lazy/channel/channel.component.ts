import { Component, OnInit } from '@angular/core';
import { LazyBase } from './../lazy-base';
import { OpenapiService } from './../../../services/openapi.service';
import { HalService } from './../../../services/hal.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent extends LazyBase implements OnInit {

  constructor(
    openapiService: OpenapiService,
    halService: HalService
  ) { super(openapiService, halService); }

  ngOnInit(): void {
  }

}
