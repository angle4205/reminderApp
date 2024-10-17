import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [HeaderComponent, UserCardComponent],
  exports: [HeaderComponent, UserCardComponent, IonicModule],
  imports: [CommonModule, IonicModule],
})
export class ShareModule {}
