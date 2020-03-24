import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugDirective } from './../directives/debug.directive';
import { StkFormsModule } from 'stk-forms';
import { StkDatepickerModule } from 'stk-datepicker';
import { RendererDirective } from './../directives/renderer.directive';




@NgModule({
  declarations: [
    DebugDirective,
    RendererDirective
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
    RendererDirective,
    StkFormsModule,
    StkDatepickerModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
