import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CardOptionComponent } from './card-option';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    CardOptionComponent
  ],
  exports:[
    CardOptionComponent
  ]
})
export class CardOptionModule {}
