import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '../notification/notification.module';
import { StorageEffects } from './effects/storage.effects';
import * as fromStorage from './reducers/storage.reducer';

@NgModule({
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromStorage.storageFeatureKey, fromStorage.reducer),
    EffectsModule.forFeature([StorageEffects]),
  ],
})
export class StorageModule {}
