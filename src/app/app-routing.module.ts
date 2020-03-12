import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealComponent } from './components/wrapers/deal/deal.component';


const routes: Routes = [
  { path: '', redirectTo: '/deal', pathMatch: 'full' },
  { path: 'deal', component: DealComponent, data: {title: 'Deal', breadcrumbs: {label: 'Deal'}} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
