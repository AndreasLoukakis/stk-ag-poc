import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StkPaginationComponent } from './stk-pagination.component';



@NgModule({
  declarations: [StkPaginationComponent],
  imports: [
    CommonModule
  ],
  exports: [StkPaginationComponent]
})
export class StkPaginationModule { }
