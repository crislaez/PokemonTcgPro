import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from './no-data';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    NoDataComponent
  ],
  exports:[
    NoDataComponent
  ]
})
export class NoDataModule {}
