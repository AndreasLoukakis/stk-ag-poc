import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealComponent } from './deal.component';
import { ApplicationComponent } from './components/application/application.component';
import { PartiesComponent } from './components/parties/parties.component';

const routes: Routes = [
  { path: ':id', component: DealComponent,
    children: [
      {
        path: ':halkey', component: ApplicationComponent,
        data: { title: 'Application', breadcrumbs: {label: 'Application'} },
      },
      {
        path: 'dealparties', component: PartiesComponent,
        data: { title: 'Parties', breadcrumbs: {label: 'Parties'} },
      },
      {
        path: 'borrower/:id', component: PartiesComponent,
        data: { title: 'Borrower', breadcrumbs: {label: 'Borrower'} },
      },
      {
        path: 'guarantor/:id', component: PartiesComponent,
        data: { title: 'Guarantor', breadcrumbs: {label: 'Guarantor'} },
      }
      //
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealRoutingModule { }
