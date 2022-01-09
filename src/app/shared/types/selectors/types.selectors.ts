import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTypes from '../reducers/types.reducers';

export const selectorTypesState = createFeatureSelector<fromTypes.State>(
  fromTypes.typesFeatureKey
);

export const getTypeStatus = createSelector(
  selectorTypesState,
  (state) => state.typesStatus
);

export const getTypes = createSelector(
  selectorTypesState,
  (state) => state.types
);

export const getSubtypeStatus = createSelector(
  selectorTypesState,
  (state) => state.subtypesStatus
);

export const getSubtype = createSelector(
  selectorTypesState,
  (state) => state.subtypes
);

export const getSupertypeStatus = createSelector(
  selectorTypesState,
  (state) => state.supertypesStatus
);

export const getSupertype = createSelector(
  selectorTypesState,
  (state) => state.supertypes
);

export const getError = createSelector(
  selectorTypesState,
  (state) => state.error
);

