import { createReducer, on } from '@ngrx/store';
import { EntityStatus } from '@pokemonTcgApp/shared/utils/helpers/functions';
import * as RarityActions from '../actions/rarity.actions';

export const rarityFeatureKey = 'rarity';

export interface State {
  status: EntityStatus;
  rarities?: string[];
  error?: unknown;
};

export const initialState: State = {
  status: EntityStatus.Initial,
  rarities: null,
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(RarityActions.loadRarities, (state): State => ({ ...state,  error: undefined, status: EntityStatus.Pending })),
  on(RarityActions.saveRarities, (state, { rarities, status, error }): State => ({ ...state, rarities, status, error }))
);
