import { Component, NgModule } from '@angular/core';
import { ComplexBaseComponent } from '../../../stk/abstract/complex-base-component';
import { ApiService } from '../../../stk/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  templateUrl: './deal-party-role-type.component.html',
  styleUrls: ['./deal-party-role-type.component.scss']
})
export class DealPartyRoleTypeComponent extends ComplexBaseComponent {

  adminMode = false;

  constructor(
    api: ApiService
  ) {
    super(api);
  }

}

@NgModule({
  declarations: [DealPartyRoleTypeComponent],
  imports: [SharedModule],
  providers: []
})
class BorrowerRoleTypeModule {}
