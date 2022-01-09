import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from './../notification/notification.module';
import { SetEffects } from './effects/set.effects';
import * as fromSet from './reducers/set.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromSet.setFeatureKey, fromSet.reducer),
    EffectsModule.forFeature([SetEffects]),
  ]
})
export class SetsModule { }
