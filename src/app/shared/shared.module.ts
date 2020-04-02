import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StkFormsModule } from 'stk-forms';
import { StkDatepickerModule } from 'stk-datepicker';
import { StkModule } from './../stk/stk.module';
import { StkListsModule } from 'stk-lists';
import { StkTablesModule } from 'stk-tables';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    StkDatepickerModule,
    StkFormsModule,
    StkModule,
    ReactiveFormsModule,
    StkListsModule,
    StkTablesModule
  ],
  exports: [
    CommonModule,
    StkFormsModule,
    StkDatepickerModule,
    StkModule,
    ReactiveFormsModule,
    StkListsModule,
    StkTablesModule
  ]
})
export class SharedModule { }
