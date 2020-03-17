import { Component, OnInit, NgModule, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { StkFormsModule } from 'stk-forms';
import { StkDatepickerModule } from 'stk-datepicker';
import { CommonModule } from '@angular/common';

import { RendererInfo } from './../../../models';

@Component({
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  @Input() renderInfo: RendererInfo;
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

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [BranchComponent],
  imports: [StkFormsModule, StkDatepickerModule, CommonModule]
})
class BranchModule {}
