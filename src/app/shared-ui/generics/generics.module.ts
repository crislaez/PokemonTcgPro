import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TypesModule } from '@pokemonTcgApp/shared/types/types.module';
import { SwiperModule } from 'swiper/angular';
import { CardModalComponent } from './components/card-modal.component';
import { FilterModalComponent } from './components/filter-modal.component';
import { InfiniteScrollComponent } from './components/infinite-scroll.component';
import { NoDataComponent } from './components/no-data.component';
import { SpinnerComponent } from './components/spinner.component';

const COMPONENTS = [
  CardModalComponent,
  FilterModalComponent,
  InfiniteScrollComponent,
  SpinnerComponent,
  NoDataComponent
];
@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    IonicModule,
    TypesModule,
    SwiperModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  exports:[
    ...COMPONENTS
  ]
})
export class GenericsModule { }
