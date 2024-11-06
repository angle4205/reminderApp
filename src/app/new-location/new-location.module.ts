import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewLocationPageRoutingModule } from './new-location-routing.module';

import { NewLocationPage } from './new-location.page';
import { ShareModule } from '../modules/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewLocationPageRoutingModule,
    ShareModule
  ],
  declarations: [NewLocationPage]
})
export class NewLocationPageModule {}
