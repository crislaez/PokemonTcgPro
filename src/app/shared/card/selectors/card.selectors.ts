import { createFeatureSelector, createSelector } from '@ngrx/store';
import { combineFeatureKey, CombineState } from '../reducers';
import { cardListFeatureKey } from '../reducers/card.reducer';
import { setCardFeatureKey } from '../reducers/set-card.reducer';


export const selectCombineState = createFeatureSelector<CombineState>(combineFeatureKey);


/* === CARDLIST === */
export const selectCardListState = createSelector(
  selectCombineState,
  (state) => state[cardListFeatureKey]
);


export const selectCards = createSelector(
  selectCardListState,
  (state) => state?.cards
);

export const selectStatus = createSelector(
  selectCardListState,
  (state) => state?.status
);

export const selectTotalCount = createSelector(
  selectCardListState,
  (state) => state?.totalCount
);

export const selectFilters = createSelector(
  selectCardListState,
  (state) => state?.filter
)

export const selectPage = createSelector(
  selectCardListState,
  (state) => state?.page
);

export const selectError = createSelector(
  selectCardListState,
  (state) => state?.error
);



/* === SET CARD === */
export const selectSetCardState = createSelector(
  selectCombineState,
  (state) => state[setCardFeatureKey]
);


export const selectSetCardError = createSelector(
  selectSetCardState,
  (state) => state?.error
);

export const selectSetsList = createSelector(
  selectSetCardState,
  (state) => state?.sets
);

export const selectSetCardsCards = (setId: string) => createSelector(
  selectSetsList,
  (allSets) => allSets?.[setId]?.cards
);

export const selectSetCardsStatus = (setId: string) => createSelector(
  selectSetsList,
  (allSets) => allSets?.[setId]?.status
);

export const selectSetCardsPage = (setId: string) => createSelector(
  selectSetsList,
  (allSets) => allSets?.[setId]?.page
);

export const selectSetCardsTotalCount = (setId: string) => createSelector(
  selectSetsList,
  (allSets) => allSets?.[setId]?.totalCount
);

export const selectSetCardsFilter = (setId: string) => createSelector(
  selectSetsList,
  (allSets) => allSets?.[setId]?.filter
);
