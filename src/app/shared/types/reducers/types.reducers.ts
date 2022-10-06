
import { createReducer, on } from '@ngrx/store';
import { EntityStatus } from '@PokeTCGdex/shared/utils/functions';
import * as TypesActions from '../actions/types.actions';
import { Type } from '../models';

export const typesFeatureKey = 'types';

export interface State {
  typesStatus: EntityStatus;
  types?: Type[];
  subtypesStatus: EntityStatus;
  subtypes?: string[];
  supertypesStatus: EntityStatus;
  supertypes?: string[];
  error?: unknown;
};

export const initialState: State = {
  typesStatus: EntityStatus.Initial,
  types: null,
  subtypesStatus: EntityStatus.Initial,
  subtypes: null,
  supertypesStatus: EntityStatus.Initial,
  supertypes: null,
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(TypesActions.loadTypes, (state): State => ({ ...state,  error: undefined, typesStatus: EntityStatus.Pending })),
  on(TypesActions.saveTypes, (state, { types, status, error }): State => {
    const updateTypes = (types || [])?.map(item =>{
     return {
        type: item,
        image: `../../../../assets/images/${item}.png`
      }
    })
    return { ...state, types: updateTypes || [], typesStatus: status, error }
  }),

  on(TypesActions.loadSubTypes, (state): State => ({ ...state,  error: undefined, subtypesStatus: EntityStatus.Pending })),
  on(TypesActions.saveSubTypes, (state, { subtypes, status, error }): State => ({ ...state, subtypes, subtypesStatus: status, error })),

  on(TypesActions.loadSuperTypes, (state): State => ({ ...state,  error: undefined, supertypesStatus: EntityStatus.Pending })),
  on(TypesActions.saveSuperTypes, (state, { supertypes, status, error }): State => ({ ...state, supertypes, supertypesStatus: status, error }))
);
