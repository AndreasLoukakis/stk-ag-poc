import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RendererDirective } from './directives/renderer.directive';
import { DebugDirective } from './directives/debug.directive';
import { AddHeadersInterceptor } from './interceptors/add-headers.interceptor';
import { OpenApiParserModule } from './open-api-parser/open-api-parser.module';

import { StkFormsModule } from './libs/stk-forms/stk-forms.module'
import { StkDatepickerModule } from './libs/stk-datepicker/stk-datepicker.module'
import { StkListsModule } from './libs/stk-lists/stk-lists.module'
import { StkPaginationModule } from './libs/stk-pagination/stk-pagination.module'
import { StkTablesModule } from './libs/stk-tables/stk-tables.module'

@NgModule({
  declarations: [
    RendererDirective,
    DebugDirective
  ],
  imports: [
    CommonModule,
    OpenApiParserModule,
    StkFormsModule,
    StkDatepickerModule,
    StkListsModule,
    StkPaginationModule,
    StkTablesModule
  ],
  exports: [
    RendererDirective,
    DebugDirective,
    OpenApiParserModule,
    StkFormsModule,
    StkDatepickerModule,
    StkListsModule,
    StkPaginationModule,
    StkTablesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeadersInterceptor,
      multi: true
    }
  ]
})
export class StkModule { }
