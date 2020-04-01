import { Component, NgModule } from '@angular/core';
import { ComplexBaseComponent } from './../../../stk/abstract/complex-base-component';
import { ApiService } from '../../../stk/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent extends ComplexBaseComponent {

  constructor(
    api: ApiService
  ) { super(api); }
}

@NgModule({
  declarations: [CurrencyComponent],
  imports: [SharedModule],
  providers: []
})
class CurrenncyModule {}

