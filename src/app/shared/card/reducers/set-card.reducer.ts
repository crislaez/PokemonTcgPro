import { EntityStatus } from '@PokeTCGdex/shared/utils/functions';
import { createReducer, on } from '@ngrx/store';
import * as CardActions from '../actions/card.actions';
import { Card } from '../models';
import { Filter } from '@PokeTCGdex/shared/models';

export const setCardFeatureKey = 'setCard';

export interface SetState {
  status: EntityStatus;
  cards?: Card[];
  page?:number;
  totalCount?:number;
  filter?: Filter;
}

export interface State {
  sets: {[key:string]:SetState}
  error?: unknown;
}

export const initialState: State = {
  sets: {},
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(CardActions.loadSetCards, (state, { setId }): State => ({
    ...state,
    sets: {
      ...(state?.sets ?? {}),
      [setId]:{
        ...(state?.sets?.[setId] ?? {}),
        status: EntityStatus.Pending
      }
    },
    error: undefined
  })),
  on(CardActions.saveSetCards, (state, { cards, setId, page, filter, totalCount, status, error }): State => {
    return {
      ...state,
      sets: {
        ...(state?.sets ?? {}),
        [setId]:{
          cards: page === 1
                ? cards
                : [...(state?.sets?.[setId]?.cards ?? []), ...(cards ?? [])],
          page,
          filter,
          totalCount,
          status,
        }
      },
      error
    }
  }),
);
