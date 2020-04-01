import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RendererDirective } from './directives/renderer.directive';
import { DebugDirective } from './directives/debug.directive';
import { AddHeadersInterceptor } from './interceptors/add-headers.interceptor';


@NgModule({
  declarations: [
    RendererDirective,
    DebugDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    RendererDirective,
    DebugDirective
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
