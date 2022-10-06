import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PokemonCardComponent } from './pokemon-card';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    PokemonCardComponent
  ],
  exports:[
    PokemonCardComponent
  ]
})
export class PokemonCardModule {}
