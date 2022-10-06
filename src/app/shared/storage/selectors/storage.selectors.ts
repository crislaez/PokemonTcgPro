import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStorage from '../reducers/storage.reducer';

export const selectStorageState = createFeatureSelector<fromStorage.State>(
  fromStorage.storageFeatureKey
);

export const selectCards = createSelector(
  selectStorageState,
  (state) => state.cards
);

export const selectStatus = createSelector(
  selectStorageState,
  (state) => state.status
);

export const selectError = createSelector(
  selectStorageState,
  (state) => state.error
);
