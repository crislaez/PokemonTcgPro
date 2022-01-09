import { EntityStatus } from '@pokemonTcgApp/shared/utils/helpers/functions';
import { createAction, props } from '@ngrx/store';
import { Filter } from '@pokemonTcgApp/shared/utils/models';
import { Card } from '../models';


export const loadCards = createAction(
  '[Card] Load Cards',
  props<{ page: number, filter?: Filter }>()
);

export const saveCards = createAction(
  '[Card] Save Cards',
  props<{ cards: Card[], page: number, filter?: Filter, totalCount: number, error:unknown, status:EntityStatus }>()
);

export const deleteCards = createAction(
  '[Card] Delete Cards'
);
