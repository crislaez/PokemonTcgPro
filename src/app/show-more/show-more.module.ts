import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GenericsModule } from '@pokemonTcgApp/shared-ui/generics/generics.module';
import { SetsModule } from './../shared/sets/sets.module';
import { ShowMorePage } from './containers/show-more.page';
import { ShowMorePageRoutingModule } from './show-more-routing.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    GenericsModule,
    SetsModule,
    TranslateModule.forChild(),
    ShowMorePageRoutingModule
  ],
  declarations: [ShowMorePage]
})
export class ShowMorePageModule {}
