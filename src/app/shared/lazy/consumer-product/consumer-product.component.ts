import { Component, OnInit, NgModule } from '@angular/core';
import { ComplexBaseComponent } from '../../../stk/abstract/complex-base-component';
import { ApiService } from '../../../stk/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-consumer-product',
  templateUrl: './consumer-product.component.html',
  styleUrls: ['./consumer-product.component.scss'],
  providers: [{provide: ComplexBaseComponent, useExisting: ConsumerProductComponent}]
})
export class ConsumerProductComponent extends ComplexBaseComponent {

  constructor(
    api: ApiService
  ) { super(api); }


}
@NgModule({
  declarations: [ConsumerProductComponent],
  imports: [SharedModule],
  providers: []
})
class ConsumerProductModule {}
