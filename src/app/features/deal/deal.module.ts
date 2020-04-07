import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { DealRoutingModule } from './deal-routing.module';
import { DealComponent } from './deal.component';
import { ApplicationComponent } from './components/application/application.component';
import { PartiesComponent } from './components/parties/parties.component';
import { NavigationComponent } from './components/navigation/navigation.component';


@NgModule({
  declarations: [DealComponent, ApplicationComponent, PartiesComponent, NavigationComponent],
  imports: [
    SharedModule,
    DealRoutingModule
  ]
})
export class DealModule { }
