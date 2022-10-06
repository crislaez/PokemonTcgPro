import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '@PokeTCGdex/shared/notification/notification.module';
import { CardEffects } from './effects/card.effects';
import { combineFeatureKey, reducer } from './reducers';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(combineFeatureKey, reducer),
    EffectsModule.forFeature([CardEffects]),
  ]
})
export class CardModule { }
