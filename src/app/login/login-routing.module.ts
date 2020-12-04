import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdduserComponent } from '../adduser/adduser.component';
import { SwiperGesturePage } from '../swiper-gesture/swiper-gesture.page';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  { path: 'swiper', component: SwiperGesturePage},   
  {path : 'adduser',component: AdduserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
