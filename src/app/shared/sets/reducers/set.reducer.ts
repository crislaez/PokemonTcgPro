import { createReducer, on } from '@ngrx/store';
import { EntityStatus, sortByDate } from '@PokeTCGdex/shared/utils/functions';
import * as SetActions from '../actions/set.actions';
import { Set } from '../models';

export const setFeatureKey = 'set';

export interface State {
  status: EntityStatus;
  sets?: Set[] ;
  error?: unknown;
};

export const initialState: State = {
  status: EntityStatus.Initial,
  sets: null,
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(SetActions.loadSets, (state): State => ({ ...state,  error: undefined, status: EntityStatus.Pending })),
  on(SetActions.saveSets, (state, { sets, status, error }): State => {
    const orderSets = sortByDate(sets,'releaseDate')
    return {
      ...state,
      sets: orderSets,
      status,
      error
    }
  })
);
