import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCard from '../reducers/card.reducer';

export const selectorCardState = createFeatureSelector<fromCard.State>(
  fromCard.cardFeatureKey
);

export const getStatus = createSelector(
  selectorCardState,
  (state) => state.status
);

export const getCards = createSelector(
  selectorCardState,
  (state) => state.cards
);

export const getTotalCount = createSelector(
  selectorCardState,
  (state) => state.totalCount
);

export const getFilters = createSelector(
  selectorCardState,
  (state) => state.filter
)

export const getPage = createSelector(
  selectorCardState,
  (state) => state.page
);

export const getError = createSelector(
  selectorCardState,
  (state) => state.error
);

