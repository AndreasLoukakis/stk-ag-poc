import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebugDirective } from './../directives/debug.directive';
import { StkFormsModule } from 'stk-forms';
import { StkDatepickerModule } from 'stk-datepicker';



@NgModule({
  declarations: [
    DebugDirective
  ],
  imports: [
    CommonModule,
    StkDatepickerModule,
    StkFormsModule
  ],
  exports: [
    CommonModule,
    DebugDirective,
    StkFormsModule,
    StkDatepickerModule
  ]
})
export class SharedModule { }
