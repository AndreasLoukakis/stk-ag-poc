import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RendererDirective } from './directives/renderer.directive';
import { DebugDirective } from './directives/debug.directive';
import { AddHeadersInterceptor } from './interceptors/add-headers.interceptor';
import { OpenApiParserModule } from './open-api-parser/open-api-parser.module';

@NgModule({
  declarations: [
    RendererDirective,
    DebugDirective
  ],
  imports: [
    CommonModule,
    OpenApiParserModule
  ],
  exports: [
    RendererDirective,
    DebugDirective,
    OpenApiParserModule
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
