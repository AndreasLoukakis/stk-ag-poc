import { Component, OnInit, NgModule, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { StkFormsModule } from 'stk-forms';
import { StkDatepickerModule } from 'stk-datepicker';
import { CommonModule } from '@angular/common';

import { OpenapiService } from './../../../services/openapi.service';
import { HalService } from './../../../services/hal.service';

import { ResourceInfo } from './../../../models';

import { tap } from 'rxjs/operators';

@Component({
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  @Input() renderInfo: ResourceInfo;
  group: FormGroup = new FormGroup({});

  config = {
    type: 'input.text',
    title: 'First name',
    required: false,
    name: 'fooModel',
    value: '3456abc',
    x_disabled: false,
    x_placeholder: 'Some placeholder',
    x_behavior: ['append:**', 'uppercase'],
    x_validation: []
  };

  constructor(
    private openapiService: OpenapiService,
    private halService: HalService
  ) { }

  ngOnInit(): void {
    this.halService.getResource(this.renderInfo.href).pipe(tap(console.log));
  }

}

@NgModule({
  declarations: [BranchComponent],
  imports: [StkFormsModule, StkDatepickerModule, CommonModule]
})
class BranchModule {}
