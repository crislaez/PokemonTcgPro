import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SpinnerModule } from '../spinner/spinner.module';
import { InfiniteScrollComponent } from './infinite-scroll';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SpinnerModule,
  ],
  declarations: [
    InfiniteScrollComponent
  ],
  exports:[
    InfiniteScrollComponent
  ]
})
export class InfiniteScrollModule {}
