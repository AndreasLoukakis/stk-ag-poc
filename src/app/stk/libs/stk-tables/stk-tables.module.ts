import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StkTablesComponent } from './stk-tables.component';
import { TableComponent } from './tables/basic/table/table.component';
import { RowComponent } from './tables/basic/row/row.component';
import { RowNoResultsComponent } from './tables/basic/row-no-results/row-no-results.component';
import { CompoundRowComponent } from './tables/basic/compound-row/compound-row.component';
import { TheadComponent } from './tables/basic/thead/thead.component';


const exports = [TableComponent, RowComponent, RowNoResultsComponent, CompoundRowComponent, TheadComponent];

@NgModule({
  declarations: [StkTablesComponent, ...exports],
  imports: [
    CommonModule
  ],
  exports: [...exports]
})
export class StkTablesModule { }
