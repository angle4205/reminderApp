import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { ShareModule } from '../modules/share/share.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ShareModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
