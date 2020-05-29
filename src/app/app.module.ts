import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppviewsModule} from "./views/appviews.module";

// App modules/components
import {LayoutsModule} from "./components/common/layouts/layouts.module";
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupTypeModalComponent } from './components/common/group-type-modal/group-type-modal.component';
import { LanguageComponent } from './components/common/language/language.component';
import { LanguageModalComponent } from './components/common/language-modal/language-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupDetailComponent,
    GroupTypeModalComponent,
    LanguageComponent,
    LanguageModalComponent
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
    NgbModule
  ],
  providers: [
    { provide: 'LIFF_ID_GROUP_DETAIL', useValue: '1654064299-9Dnd5mlw' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
