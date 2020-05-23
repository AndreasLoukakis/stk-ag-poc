import { Component, OnInit, NgModule } from '@angular/core';
import { ComplexBaseComponent } from '../../../stk/abstract/complex-base-component';
import { ApiService } from '../../../stk/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  templateUrl: './mortgage-product.component.html',
  styleUrls: ['./mortgage-product.component.scss'],
  providers: [{provide: ComplexBaseComponent, useExisting: MortgageProductComponent}]
})
export class MortgageProductComponent extends ComplexBaseComponent {

  constructor(
    api: ApiService
  ) { super(api); }

}

@NgModule({
  declarations: [MortgageProductComponent],
  imports: [SharedModule],
  providers: []
})
class MortgageProductModule {}
