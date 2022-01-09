import { EntityStatus } from '@pokemonTcgApp/shared/utils/helpers/functions';
import { createReducer, on } from '@ngrx/store';
import * as CardActions from '../actions/card.actions';
import { Card } from '../models';
import { Filter } from '@pokemonTcgApp/shared/utils/models';

export const cardFeatureKey = 'card';

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
  page: 0,
  totalCount:0,
  filter: null,
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(CardActions.loadCards, (state): State => ({ ...state,  error: undefined, status: EntityStatus.Pending })),
  on(CardActions.saveCards, (state, { cards, page, filter, totalCount, status, error }): State => {
    const cardsState = page === 1 ? [...cards] : [...state?.cards, ...cards];
    return ({ ...state, cards: cardsState || [], page, filter, totalCount, status, error })
  }),

  on(CardActions.deleteCards, (state): State => ({ ...state,  error: undefined, status: EntityStatus.Initial, cards: [], page: 1, totalCount: 0, filter:{} })),
);
