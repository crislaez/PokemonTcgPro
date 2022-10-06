import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SpinnerComponent } from './spinner';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    SpinnerComponent
  ],
  exports:[
    SpinnerComponent
  ]
})
export class SpinnerModule {}
