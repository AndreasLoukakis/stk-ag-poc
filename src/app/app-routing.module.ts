import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'inbox', pathMatch: 'full' },
  {
    path: 'inbox',
    data: { title: 'Inbox', breadcrumbs: {label: 'Inbox'} },
    loadChildren: () => import('./features/inbox/inbox.module').then(m => m.InboxModule) },
  {
    path: 'deals',
    data: { title: 'Deal', breadcrumbs: {label: 'Deal'} },
    loadChildren: () => import('./features/deal/deal.module').then(m => m.DealModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
