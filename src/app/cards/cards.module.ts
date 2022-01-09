import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GenericsModule } from '@pokemonTcgApp/shared-ui/generics/generics.module';
import { CardModule } from '@pokemonTcgApp/shared/card/card.module';
import { SharedModule } from '@pokemonTcgApp/shared/shared/shared.module';
import { CardsPageRoutingModule } from './cards-routing.module';
import { CardsPage } from './containers/cards.page';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CardModule,
    SharedModule,
    GenericsModule,
    TranslateModule.forChild(),
    CardsPageRoutingModule
  ],
  declarations: [CardsPage]
})
export class CardsPageModule {}
