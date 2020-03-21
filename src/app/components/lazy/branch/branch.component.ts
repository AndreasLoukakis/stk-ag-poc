import { Component, OnInit, NgModule, OnChanges, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { LazyBase } from './../lazy-base';
import { OpenapiService } from './../../../services/openapi.service';
import { HalService } from './../../../services/hal.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldConfig } from 'stk-forms';

@Component({
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent extends LazyBase implements OnInit, OnChanges {

  resources = [];
  properties = ['id', 'code', 'description', 'disabled'];

  formgroup: FormGroup = new FormGroup({
    fooModel: new FormControl(),
  });

  config = {
    title: 'Branch',
    value: 2,
    required: false,
    name: 'branch',
    x_disabled: false,
    x_lookupItems$: this.resourceDataValues$.pipe(map(values => values.items))
  };

  constructor(
    openapiService: OpenapiService,
    halService: HalService
  ) { super(openapiService, halService); }

  // callback to format options
  valuesCallback = (item) => ({
    name: item.description,
    value: item.id
  })


}

@NgModule({
  declarations: [BranchComponent],
  imports: [SharedModule],
  providers: []
})
class BranchModule {}
