import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { StarterViewComponent } from "./views/starterview.component";
import { LoginComponent } from "./views/login.component";

import { BlankLayoutComponent } from "./components/common/layouts/blankLayout.component";
import { BasicLayoutComponent } from "./components/common/layouts/basicLayout.component";

import { GroupDetailComponent } from "./components/group-detail/group-detail.component"
import { SettingComponent } from "./components/setting/setting.component"

import { LoggedInGuard } from './logged-in.guard';

const routes: Routes = [
  // Main redirect
  { path: '', redirectTo: 'starterview', pathMatch: 'full' },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      { path: 'starterview', component: StarterViewComponent, canActivate: [LoggedInGuard] },      
      { path: 'group-detail/:id', component: GroupDetailComponent, canActivate: [LoggedInGuard] },
      { path: 'setting', component: SettingComponent, canActivate: [LoggedInGuard] }
    ]
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
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
