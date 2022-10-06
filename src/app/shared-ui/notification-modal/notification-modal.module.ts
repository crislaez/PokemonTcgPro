import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationModal } from './notification-modal';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  declarations: [NotificationModal]
})
export class NotificationModalModule {}
