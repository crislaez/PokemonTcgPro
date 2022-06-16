import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TypesModule } from '@pokemonTcgApp/shared/types/types.module';
import { SwiperModule } from 'swiper/angular';
import { CardAttackComponent } from './components/card-attack.component';
import { CardInfoComponent } from './components/card-info.component';
import { CardModalComponent } from './components/card-modal.component';
import { CardOthersComponent } from './components/card-others.component';
import { CardPricesComponent } from './components/card-prices.component';
import { FilterModalComponent } from './components/filter-modal.component';
import { InfiniteScrollComponent } from './components/infinite-scroll.component';
import { ItemCardComponent } from './components/item-card.component';
import { NoDataComponent } from './components/no-data.component';
import { SpinnerComponent } from './components/spinner.component';
import { SwiperComponent } from './components/swiper.component';


const COMPONENTS = [
  CardModalComponent,
  FilterModalComponent,
  InfiniteScrollComponent,
  SpinnerComponent,
  NoDataComponent,
  SwiperComponent,
  CardPricesComponent,
  CardOthersComponent,
  CardInfoComponent,
  CardAttackComponent,
  ItemCardComponent
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
