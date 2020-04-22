import { Component, NgModule } from '@angular/core';
import { ComplexBaseComponent } from '../../../stk/abstract/complex-base-component';
import { ApiService } from '../../../stk/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  templateUrl: './borrower-role-type.component.html',
  styleUrls: ['./borrower-role-type.component.scss']
})
export class BorrowerRoleTypeComponent extends ComplexBaseComponent {

  adminMode = false;

  constructor(
    api: ApiService
  ) {
    super(api);
  }

}

@NgModule({
  declarations: [BorrowerRoleTypeComponent],
  imports: [SharedModule],
  providers: []
})
class BorrowerRoleTypeModule {}
