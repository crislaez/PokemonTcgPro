import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from '@pokemonTcgApp/shared/card/card.module';
import { RarityModule } from '@pokemonTcgApp/shared/rarity/rarity.module';
import { SetsModule } from '@pokemonTcgApp/shared/sets/sets.module';
import { TypesModule } from '@pokemonTcgApp/shared/types/types.module';
import { SharedModule } from './../shared/shared/shared.module';
import { SearchPage } from './containers/search.page';
import { SearchPageRoutingModule } from './search-routing.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    SetsModule,
    RarityModule,
    TypesModule,
    CardModule,
    TranslateModule.forChild(),
    SearchPageRoutingModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
