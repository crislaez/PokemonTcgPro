import { EntityStatus } from '@PokeTCGdex/shared/utils/functions';
import { createReducer, on } from '@ngrx/store';
import * as CardActions from '../actions/card.actions';
import { Card } from '../models';
import { Filter } from '@PokeTCGdex/shared/models';

export const cardListFeatureKey = 'cardList';

export interface State {
  status: EntityStatus;
  cards?: Card[];
  page?:number;
  totalCount?:number;
  filter?: Filter;
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  cards: [],
  page: 1,
  totalCount:0,
  filter: null,
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(CardActions.loadCards, (state): State => ({ ...state,  error: undefined, status: EntityStatus.Pending })),
  on(CardActions.saveCards, (state, { cards, page, filter, totalCount, status, error }): State => {
    return {
      ...state,
      cards: page === 1
            ? cards
            : [...(state?.cards ?? []), ...(cards ?? [])],
      page,
      filter,
      totalCount,
      status,
      error
    }
  }),

);
