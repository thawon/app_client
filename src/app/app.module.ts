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
import { LiveTranslationComponent } from './components/live-translation/live-translation.component';

// Services
import { AuthInterceptorService } from '../app/services/auth-interceptor.service';
import { AvailableConnectedGroupModalComponent } from './components/available-connected-group-modal/available-connected-group-modal.component';
import { CorrectionComponent } from './components/correction/correction.component';
import { NoCorrectionComponent } from './components/no-correction/no-correction.component';
import { ToastComponent } from './components/toast/toast.component';
import { PermissionListComponent } from './components/permission-list/permission-list.component';
import { GroupDetailMemberSelectionComponent } from './components/group-detail-member-selection/group-detail-member-selection.component';
import { StartTrialModalComponent } from './components/start-trial-modal/start-trial-modal.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { CancelSubscriptionModalComponent} from './components/cancel-subscription-modal/cancel-subscription-modal.component';
import { RenewConfirmationModalComponent } from './components/renew-confirmation-modal/renew-confirmation-modal.component';
import { TermsComponent } from './components/terms/terms.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';


@NgModule({
  declarations: [
    AppComponent,
    GroupDetailComponent,
    GroupTypeModalComponent,
    LanguageComponent,
    LanguageModalComponent,
    SettingComponent,
    LiveTranslationComponent,
    AvailableConnectedGroupModalComponent,
    CorrectionComponent,
    NoCorrectionComponent,
    ToastComponent,
    PermissionListComponent,
    GroupDetailMemberSelectionComponent,
    StartTrialModalComponent,
    SubscriptionComponent,
    PaymentSuccessComponent,
    CancelSubscriptionModalComponent,
    RenewConfirmationModalComponent,
    TermsComponent,
    ContactUsComponent
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
