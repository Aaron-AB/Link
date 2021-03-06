import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageModule } from '../login/login.module';

import { SwiperGesturePage } from './swiper-gesture.page';

const routes: Routes = [
  {
    path: '',
    component: SwiperGesturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwiperGesturePageRoutingModule {}
