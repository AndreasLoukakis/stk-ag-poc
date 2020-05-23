import { Component, NgModule } from '@angular/core';
import { ComplexBaseComponent } from '../../../stk/abstract/complex-base-component';
import { ApiService } from '../../../stk/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent extends ComplexBaseComponent {

  constructor(
    api: ApiService
  ) { super(api); }
}

@NgModule({
  declarations: [ChannelComponent],
  imports: [SharedModule],
  providers: []
})
class ChannelModule {}

