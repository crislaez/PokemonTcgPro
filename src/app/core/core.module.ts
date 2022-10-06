import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationModalModule } from './../shared-ui/notification-modal/notification-modal.module';
import { AppComponent } from './layout/app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    IonicModule,
    NotificationModalModule,
    TranslateModule.forChild(),
    RouterModule
  ]
})
export class CoreModule { }
