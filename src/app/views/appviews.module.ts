import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';

import {StarterViewComponent} from "./starterview.component";
import {LoginComponent} from "./login.component";


@NgModule({
  declarations: [
    StarterViewComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    StarterViewComponent,
    LoginComponent,
    TranslateModule
  ],
})

export class AppviewsModule {
}
