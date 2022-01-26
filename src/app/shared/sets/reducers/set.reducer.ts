import { createReducer, on } from '@ngrx/store';
import { EntityStatus } from '@pokemonTcgApp/shared/utils/helpers/functions';
import * as SetActions from '../actions/set.actions';
import { Set } from '../models';

export const setFeatureKey = 'set';

export interface State {
  status: EntityStatus;
  sets?: { [key:string]:Set[] };
  lastSets?: Set[];
  error?: unknown;
};

export const initialState: State = {
  status: EntityStatus.Initial,
  sets: null,
  lastSets: null,
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(SetActions.loadSets, (state): State => ({ ...state,  error: undefined, status: EntityStatus.Pending })),
  on(SetActions.saveSets, (state, { sets, status, error }): State => {
    const filterSets = ([...sets] || [])?.sort((a, b) => {
      if ((a as any)?.releaseDate < (b as any)?.releaseDate)    return -1;
      else if( (a as any)?.releaseDate > (b as any)?.releaseDate) return  1;
      else  return  0;
    }) || [];
    const lastSets = filterSets?.slice(-10)?.reverse() || [];

    const objSets: any = filterSets?.reduce((acc, el) => {
      return {
        ...(acc ? acc : []),
        [el?.series]: [
          ...(acc?.[el?.series] ? acc?.[el?.series] : []),
          ...(el ? [el] : [])
        ]
      }
    },{})

    return { ...state, sets: objSets, lastSets, status, error }
  })
);
