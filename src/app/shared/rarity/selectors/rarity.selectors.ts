import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRarity from '../reducers/rarity.reducers';

export const selectorRarityState = createFeatureSelector<fromRarity.State>(
  fromRarity.rarityFeatureKey
);

export const getStatus = createSelector(
  selectorRarityState,
  (state) => state.status
);

export const getRarities = createSelector(
  selectorRarityState,
  (state) => state.rarities
);

export const getError = createSelector(
  selectorRarityState,
  (state) => state.error
);

