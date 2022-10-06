import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FilterModalModule } from '@PokeTCGdex/shared-ui/filter-modal/filter-modal.module';
import { InfiniteScrollModule } from '@PokeTCGdex/shared-ui/infinite-scroll/infinite-scroll.module';
import { NoDataModule } from '@PokeTCGdex/shared-ui/no-data/no-data.module';
import { SetCardModule } from '@PokeTCGdex/shared-ui/set-card/set-card.module';
import { SpinnerModule } from '@PokeTCGdex/shared-ui/spinner/spinner.module';
import { SetsModule } from '@PokeTCGdex/shared/sets/sets.module';
import { SharedModule } from '@PokeTCGdex/shared/shared/shared.module';
import { SetsPage } from './containers/sets.page';
import { SetsPageRoutingModule } from './sets-routing.module';

const SHARED_MODULE = [
  SetsModule,
];

const SHARED_UI_MODULE = [
  NoDataModule,
  SetCardModule,
  SpinnerModule,
  FilterModalModule,
  InfiniteScrollModule
];


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ...SHARED_MODULE,
    ...SHARED_UI_MODULE,
    SharedModule,
    TranslateModule.forChild(),
    SetsPageRoutingModule
  ],
  declarations: [SetsPage]
})
export class SetsPageModule {}
