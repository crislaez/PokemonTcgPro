import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RarityEffects } from './effects/rarity.effects';
import * as fromRarity from './reducers/rarity.reducers';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromRarity.rarityFeatureKey, fromRarity.reducer),
    EffectsModule.forFeature([RarityEffects]),
  ]
})
export class RarityModule { }
