import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { InboxListComponent } from './components/inbox-list/inbox-list.component';


@NgModule({
  declarations: [InboxComponent, InboxListComponent],
  imports: [
    SharedModule,
    InboxRoutingModule
  ]
})
export class InboxModule { }
