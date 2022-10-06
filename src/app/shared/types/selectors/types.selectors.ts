import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTypes from '../reducers/types.reducers';

export const selectorTypesState = createFeatureSelector<fromTypes.State>(
  fromTypes.typesFeatureKey
);

export const selectTypeStatus = createSelector(
  selectorTypesState,
  (state) => state.typesStatus
);

export const selectTypes = createSelector(
  selectorTypesState,
  (state) => state.types
);

export const selectSubtypeStatus = createSelector(
  selectorTypesState,
  (state) => state.subtypesStatus
);

export const selectSubtype = createSelector(
  selectorTypesState,
  (state) => state.subtypes
);

export const selectSupertypeStatus = createSelector(
  selectorTypesState,
  (state) => state.supertypesStatus
);

export const selectSupertype = createSelector(
  selectorTypesState,
  (state) => state.supertypes
);

export const selectError = createSelector(
  selectorTypesState,
  (state) => state.error
);

