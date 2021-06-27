import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { StarterViewComponent } from "./views/starterview.component";
import { LoginComponent } from "./views/login.component";

import { BlankLayoutComponent } from "./components/common/layouts/blankLayout.component";
import { BasicLayoutComponent } from "./components/common/layouts/basicLayout.component";

import { GroupDetailComponent } from "./components/group-detail/group-detail.component";
import { GroupDetailMemberSelectionComponent } from "./components/group-detail-member-selection/group-detail-member-selection.component";
import { PermissionListComponent } from "./components/permission-list/permission-list.component";
import { SubscriptionComponent } from "./components/subscription/subscription.component";
import { PaymentSuccessComponent } from "./components/payment-success/payment-success.component";
import { TermsComponent } from './components/terms/terms.component';
import { SettingComponent } from "./components/setting/setting.component"
import { LiveTranslationComponent } from './components/live-translation/live-translation.component';

import { LoggedInGuard } from './logged-in.guard';

const routes: Routes = [
  // Main redirect
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      { path: 'home', component: StarterViewComponent, canActivate: [LoggedInGuard] },
      
      { path: 'group-detail-member-selection/:id', component: GroupDetailMemberSelectionComponent, canActivate: [LoggedInGuard] },
      { path: 'group-detail/:id', component: GroupDetailComponent, canActivate: [LoggedInGuard] },
      { path: 'permission-list/:id', component: PermissionListComponent, canActivate: [LoggedInGuard] },
      { path: 'setting', component: SettingComponent, canActivate: [LoggedInGuard] },

      { path: 'subscription', component: SubscriptionComponent, canActivate: [LoggedInGuard] },
      { path: 'payment-success', component: PaymentSuccessComponent, canActivate: [LoggedInGuard] },
      { path: 'terms', component: TermsComponent, canActivate: [LoggedInGuard] },
      
    ]
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'live-translation/:id', component: LiveTranslationComponent, canActivate: [LoggedInGuard] },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    TranslateModule
  ],
  exports: [
    RouterModule,
    TranslateModule
  ],
  providers: [    
    LoggedInGuard
  ]

})
export class AppRoutingModule { }
