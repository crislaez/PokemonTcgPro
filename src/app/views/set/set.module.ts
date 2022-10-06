import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CardModalModule } from '@PokeTCGdex/shared-ui/card-modal/card-modal.module';
import { CardOptionModule } from '@PokeTCGdex/shared-ui/card-option/card-option.module';
import { FilterModalModule } from '@PokeTCGdex/shared-ui/filter-modal/filter-modal.module';
import { InfiniteScrollModule } from '@PokeTCGdex/shared-ui/infinite-scroll/infinite-scroll.module';
import { NoDataModule } from '@PokeTCGdex/shared-ui/no-data/no-data.module';
import { PokemonCardModule } from '@PokeTCGdex/shared-ui/pokemon-card/pokemon-card.module';
import { SpinnerModule } from '@PokeTCGdex/shared-ui/spinner/spinner.module';
import { CardModule } from '@PokeTCGdex/shared/card/card.module';
import { RarityModule } from '@PokeTCGdex/shared/rarity/rarity.module';
import { SetsModule } from '@PokeTCGdex/shared/sets/sets.module';
import { SharedModule } from '@PokeTCGdex/shared/shared/shared.module';
import { StorageModule } from '@PokeTCGdex/shared/storage/storage.module';
import { TypesModule } from '@PokeTCGdex/shared/types/types.module';
import { SetPage } from './containers/set.page';
import { SetPageRoutingModule } from './set-routing.module';


const SHARED_MODULE = [
  SetsModule,
  CardModule,
  TypesModule,
  RarityModule,
  SharedModule,
  StorageModule,
];

const SHARED_UI_MODULE = [
  NoDataModule,
  SpinnerModule,
  CardModalModule,
  CardOptionModule,
  PokemonCardModule,
  FilterModalModule,
  InfiniteScrollModule
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ...SHARED_MODULE,
    ...SHARED_UI_MODULE,
    TranslateModule.forChild(),
    SetPageRoutingModule
  ],
  declarations: [SetPage]
})
export class SetPageModule {}
