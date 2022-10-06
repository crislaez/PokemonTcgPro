import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SetCardComponent } from './set-card';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    SetCardComponent
  ],
  exports:[
    SetCardComponent
  ]
})
export class SetCardModule {}
