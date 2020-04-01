import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StkFormsModule } from 'stk-forms';
import { StkDatepickerModule } from 'stk-datepicker';
import { StkModule } from './../stk/stk.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    StkDatepickerModule,
    StkFormsModule,
    StkModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    StkFormsModule,
    StkDatepickerModule,
    StkModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
