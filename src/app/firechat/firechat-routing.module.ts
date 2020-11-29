import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirechatPage } from './firechat.page';

const routes: Routes = [
  {
    path: '',
    component: FirechatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirechatPageRoutingModule {}
