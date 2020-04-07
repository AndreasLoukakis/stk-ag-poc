import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealComponent } from './deal.component';
import { ApplicationComponent } from './components/application/application.component';
import { PartiesComponent } from './components/parties/parties.component';

const routes: Routes = [
  { path: ':id', component: DealComponent,
    children: [
      {
        path: 'application', component: ApplicationComponent,
        data: { title: 'Application', breadcrumbs: {label: 'Application'} },
      },
      {
        path: 'parties', component: PartiesComponent,
        data: { title: 'Parties', breadcrumbs: {label: 'Parties'} },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealRoutingModule { }
