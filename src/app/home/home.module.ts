import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { RarityModule } from '@pokemonTcgApp/shared/rarity/rarity.module';
import { SetsModule } from '@pokemonTcgApp/shared/sets/sets.module';
import { TypesModule } from '@pokemonTcgApp/shared/types/types.module';
import { SwiperModule } from 'swiper/angular';
import { HomePage } from './containers/home.page';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SetsModule,
    RarityModule,
    TypesModule,
    SwiperModule,
    TranslateModule.forChild(),
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
