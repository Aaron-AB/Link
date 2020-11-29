import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirechatPageRoutingModule } from './firechat-routing.module';

import { FirechatPage } from './firechat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirechatPageRoutingModule
  ],
  declarations: [FirechatPage]
})
export class FirechatPageModule {}
