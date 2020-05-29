import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StarterViewComponent } from "./views/starterview.component";
import { LoginComponent } from "./views/login.component";

import { BlankLayoutComponent } from "./components/common/layouts/blankLayout.component";
import { BasicLayoutComponent } from "./components/common/layouts/basicLayout.component";

import { GroupDetailComponent } from "./components/group-detail/group-detail.component"

const routes: Routes = [
  // Main redirect
  { path: '', redirectTo: 'starterview', pathMatch: 'full' },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      { path: 'starterview', component: StarterViewComponent },
      { path: 'group-detail/:id', component: GroupDetailComponent }      
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
