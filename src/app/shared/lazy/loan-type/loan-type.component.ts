import { Component, NgModule } from '@angular/core';
import { ComplexBaseComponent } from '../../../stk/abstract/complex-base-component';
import { ApiService } from '../../../stk/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-loan-type',
  templateUrl: './loan-type.component.html',
  styleUrls: ['./loan-type.component.scss'],
  providers: [{provide: ComplexBaseComponent, useExisting: LoanTypeComponent}]
})
export class LoanTypeComponent extends ComplexBaseComponent {

  constructor(api: ApiService) { super(api); }

}

@NgModule({
  declarations: [LoanTypeComponent],
  imports: [SharedModule],
  providers: []
})
class LoantypeModule {}
