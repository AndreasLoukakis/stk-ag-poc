import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { UiShellModule } from './ui-shell/ui-shell.module';

import { StkTablesModule } from 'stk-tables';
import { StkDatepickerModule } from 'stk-datepicker';
import { StkFormsModule } from 'stk-forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationComponent } from './components/application/application.component';
import { DealComponent } from './components/wrapers/deal/deal.component';
import { DebugDirective } from './directives/debug.directive';
import { RendererDirective } from './directives/renderer.directive';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    DealComponent,
    DebugDirective,
    RendererDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UiShellModule,
    StkTablesModule,
    StkDatepickerModule,
    StkFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
