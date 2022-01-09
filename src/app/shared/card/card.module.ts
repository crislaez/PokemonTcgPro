import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '@pokemonTcgApp/shared/notification/notification.module';
import { CardEffects } from './effects/card.effects';
import * as fromCard from './reducers/card.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromCard.cardFeatureKey, fromCard.reducer),
    EffectsModule.forFeature([CardEffects]),
  ]
})
export class CardModule { }
