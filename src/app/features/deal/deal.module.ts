import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { DealRoutingModule } from './deal-routing.module';
import { DealComponent } from './deal.component';
import { ApplicationComponent } from './components/application/application.component';
import { PartiesComponent } from './components/parties/parties.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationItemComponent } from './components/navigation-item/navigation-item.component';


@NgModule({
  declarations: [DealComponent, ApplicationComponent, PartiesComponent, NavigationComponent, NavigationItemComponent],
  imports: [
    SharedModule,
    DealRoutingModule
  ]
})
export class DealModule { }
