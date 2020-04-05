import { Component, OnInit, NgModule } from '@angular/core';
import { ComplexBaseComponent } from '../../../stk/abstract/complex-base-component';
import { ApiService } from '../../../stk/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  templateUrl: './mortgage-factory-product.component.html',
  styleUrls: ['./mortgage-factory-product.component.scss'],
  providers: [{provide: ComplexBaseComponent, useExisting: MortgageFactoryProductComponent}]
})
export class MortgageFactoryProductComponent extends ComplexBaseComponent {

  constructor(api: ApiService) { super(api); }

}

@NgModule({
  declarations: [MortgageFactoryProductComponent],
  imports: [SharedModule],
  providers: []
})
class MortgageFactoryProductModule {}
