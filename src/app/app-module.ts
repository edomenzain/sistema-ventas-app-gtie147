import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { MaterialModule } from './material.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './shared/interceptors/token-interceptor';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { loadingInterceptor } from './shared/interceptors/loading-interceptor';

@NgModule({
  declarations: [
    App,
    Header,
    Footer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ 
      showForeground: true,
      minTime: 500,
    }),
    MaterialModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([tokenInterceptor, loadingInterceptor])
    )
  ],
  bootstrap: [App]
})
export class AppModule { }
