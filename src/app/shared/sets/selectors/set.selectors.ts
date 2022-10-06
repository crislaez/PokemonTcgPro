import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSet from '../reducers/set.reducer';

export const selectorSetState = createFeatureSelector<fromSet.State>(
  fromSet.setFeatureKey
);

export const getStatus = createSelector(
  selectorSetState,
  (state) => state?.status
);

export const getSets = createSelector(
  selectorSetState,
  (state) => state?.sets
);

export const getError = createSelector(
  selectorSetState,
  (state) => state?.error
);

