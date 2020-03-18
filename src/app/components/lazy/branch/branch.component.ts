import { Component, OnInit, NgModule, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { LazyBase } from './../lazy-base';
import { OpenapiService } from './../../../services/openapi.service';
import { HalService } from './../../../services/hal.service';

import { StkFormsModule } from 'stk-forms';
import { StkDatepickerModule } from 'stk-datepicker';

import { tap } from 'rxjs/operators';

@Component({
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent extends LazyBase implements OnInit, OnChanges {

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
    openapiService: OpenapiService,
    halService: HalService
  ) { super(openapiService, halService); }

  ngOnInit(): void {
    // this.halService.getResource(this.renderInfo.href).pipe(tap(console.log));
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

}

@NgModule({
  declarations: [BranchComponent],
  imports: [StkFormsModule, StkDatepickerModule, CommonModule]
})
class BranchModule {}
