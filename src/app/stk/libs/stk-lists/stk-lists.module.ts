import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StkListsComponent } from './stk-lists.component';
import { ListComponent } from './lists/basic/list/list.component';
import { DataListItemComponent } from './lists/basic/items/data-list-item/data-list-item.component';
import { StkPaginationModule } from 'stk-pagination';
import { StkTablesModule } from 'stk-tables';



@NgModule({
  declarations: [StkListsComponent, ListComponent, DataListItemComponent],
  imports: [
    CommonModule, StkPaginationModule, StkTablesModule
  ],
  exports: [ListComponent, DataListItemComponent]
})
export class StkListsModule { }
