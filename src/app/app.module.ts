import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppviewsModule } from "./views/appviews.module";

// App modules/components
import { LayoutsModule } from "./components/common/layouts/layouts.module";
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupTypeModalComponent } from './components/common/group-type-modal/group-type-modal.component';
import { LanguageComponent } from './components/common/language/language.component';
import { LanguageModalComponent } from './components/common/language-modal/language-modal.component';
import { SettingComponent } from './components/setting/setting.component';

// Services
import { AuthInterceptorService } from '../app/services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    GroupDetailComponent,
    GroupTypeModalComponent,
    LanguageComponent,
    LanguageModalComponent,
    SettingComponent
  ],
  imports: [
    LayoutsModule,
    AppviewsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: 'LIFF_ID_GROUP_DETAIL', useValue: '1654064299-9Dnd5mlw' },
    { provide: 'LIFF_ID_INDEX', useValue: '1654064299-5zNao6gm' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
