import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { MaterialModule } from './material.module';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    Header,
    Footer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
