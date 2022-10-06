import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@PokeTCGdex/shared/shared/shared.module';
import { NoDataModule } from '../no-data/no-data.module';
import { SetCardModule } from '../set-card/set-card.module';
import { CardInfoComponent } from './components/card-info';
import { CardPriceComponent } from './components/card-price';
import { CardSetComponent } from './components/card-set';
import { CardModalComponent } from './container/card-modal';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NoDataModule,
    SetCardModule,
    SharedModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    CardModalComponent,
    CardInfoComponent,
    CardPriceComponent,
    CardSetComponent
  ],
  exports:[
    CardModalComponent,
    CardInfoComponent,
    CardPriceComponent,
    CardSetComponent
  ]
})
export class CardModalModule {}
