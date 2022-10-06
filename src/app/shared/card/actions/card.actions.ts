import { createAction, props } from '@ngrx/store';
import { Filter } from '@PokeTCGdex/shared/models';
import { EntityStatus } from '@PokeTCGdex/shared/utils/functions';
import { Card } from '../models';


export const loadCards = createAction(
  '[Card] Load Cards',
  props<{ page: number, filter?: Filter }>()
);

export const saveCards = createAction(
  '[Card] Save Cards',
  props<{ cards: Card[], page: number, filter?: Filter, totalCount: number, error:unknown, status:EntityStatus }>()
);



export const loadSetCards = createAction(
  '[Card] Load Set Cards',
  props<{ page: number, setId: string; filter?: Filter }>()
);

export const saveSetCards = createAction(
  '[Card] Save Set Cards',
  props<{ cards: Card[], setId: string, page: number, filter?: Filter, totalCount: number, error:unknown, status:EntityStatus }>()
);
