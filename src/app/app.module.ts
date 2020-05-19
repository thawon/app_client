import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {AppviewsModule} from "./views/appviews.module";

// App modules/components
import {LayoutsModule} from "./components/common/layouts/layouts.module";
import { GroupDetailComponent } from './components/group-detail/group-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupDetailComponent
  ],
  imports: [
    LayoutsModule,
    AppviewsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
