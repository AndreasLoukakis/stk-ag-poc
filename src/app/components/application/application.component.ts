import { Component, OnInit, Input } from '@angular/core';

import { HalService } from './../../services/hal.service';
import { OpenapiService  } from './../../services/openapi.service';

import { RendererInfo } from './../../models';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  @Input() resourceName: string;
  @Input() href: string;

  propPlaceholders: string[] = [
    'channel', 'branch', 'branchOther', 'loanType', 'consumerProduct'
  ];

  constructor(
    private hal: HalService,
    private openapi: OpenapiService
  ) {}

  ngOnInit(): void {
    this.hal.getResource(this.href).subscribe(console.log);
  }

}

export interface ResourceProperty {
  name: string;
  type: any;
  renderInfo: RendererInfo;
}
