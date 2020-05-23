import { BrowserModule } from '@angular/platform-browser';
import { Location, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { UiShellModule } from './ui-shell/ui-shell.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FallbackComponent } from './shared/lazy/fallback/fallback.component';

@NgModule({
  declarations: [
    AppComponent,
    FallbackComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UiShellModule,
    SharedModule
  ],
  providers: [
    Location, {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
