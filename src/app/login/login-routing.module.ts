import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { AdduserComponent } from '../components/adduser/adduser.component';
import { InterestComponent } from '../components/interest/interest.component';

const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'addUser', component: AdduserComponent}, 
  { path: 'interests', component: InterestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
