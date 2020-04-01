import { Component, NgModule } from '@angular/core';
import { ComplexBaseComponent } from './../../../stk/abstract/complex-base-component';
import { ApiService } from '../../../stk/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  templateUrl: './consumer-factory-product.component.html',
  styleUrls: ['./consumer-factory-product.component.scss']
})
export class ConsumerFactoryProductComponent extends ComplexBaseComponent {

  constructor(
    api: ApiService
  ) { super(api); }
}

@NgModule({
  declarations: [ConsumerFactoryProductComponent],
  imports: [SharedModule],
  providers: []
})
class ConsumerProductModule {}
