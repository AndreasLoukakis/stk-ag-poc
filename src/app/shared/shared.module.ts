import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
    StkFormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    DebugDirective,
    StkFormsModule,
    StkDatepickerModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
