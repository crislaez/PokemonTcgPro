import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '@PokeTCGdex/shared/notification/notification.module';
import { TypesEffects } from './effects/types.effects';
import * as fromTypes from './reducers/types.reducers';


@NgModule({
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromTypes.typesFeatureKey, fromTypes.reducer),
    EffectsModule.forFeature([TypesEffects]),
  ]
})
export class TypesModule { }
