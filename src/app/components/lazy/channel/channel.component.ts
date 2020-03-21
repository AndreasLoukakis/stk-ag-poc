import { Component, OnInit, NgModule } from '@angular/core';
import { LazyBase } from './../lazy-base';
import { OpenapiService } from './../../../services/openapi.service';
import { HalService } from './../../../services/hal.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent extends LazyBase implements OnInit {

  properties = ['id', 'name'];
  resources = [];

  constructor(
    openapiService: OpenapiService,
    halService: HalService
  ) { super(openapiService, halService); }

}
@NgModule({
  declarations: [ChannelComponent],
  imports: [SharedModule]
})
class ChannelModule {}

