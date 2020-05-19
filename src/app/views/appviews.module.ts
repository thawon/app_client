import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

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
  ],
  exports: [
    StarterViewComponent,
    LoginComponent
  ],
})

export class AppviewsModule {
}
