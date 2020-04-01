import { Component, NgModule } from '@angular/core';
import { ComplexBaseComponent } from './../../../stk/abstract/complex-base-component';
import { ApiService } from '../../../stk/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent extends ComplexBaseComponent {

  constructor(
    api: ApiService
  ) { super(api); }
}

@NgModule({
  declarations: [BranchComponent],
  imports: [SharedModule],
  providers: []
})
class BranchModule {}
