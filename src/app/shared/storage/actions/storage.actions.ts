import { createAction, props } from '@ngrx/store';
import { Card } from '@PokeTCGdex/shared/card';
import { StorageCard } from '../model';


export const loadStorageCards = createAction(
  '[Storage] Load Storage Cards',
);

export const loadStorageCardsSuccess = createAction(
  '[Storage] Load Storage Cards Success',
  props<{ cards: StorageCard[] }>()
);

export const loadStorageCardsFailure = createAction(
  '[Storage] Load Storage Cards Failure',
  props<{error?: unknown, message?: string}>()
);



export const deleteStorageCard = createAction(
  '[Storage] Delete Storage Card',
  props<{ hashCard:string}>()
);

export const deleteStorageCardSuccess = createAction(
  '[Storage] Delete Storage Card Success',
  props<{ message?:string }>()
);

export const deleteStorageCardFailure = createAction(
  '[Storage] Delete Storage Card Failure',
  props<{ error?:unknown, message?: string }>()
);



export const saveStorageCard = createAction(
  '[Storage] Save Storage Card',
  props<{ card:Card }>()
);

export const saveStorageCardSuccess = createAction(
  '[Storage] Save Storage Card Success',
  props<{ message?:string }>()
);

export const saveStorageCardFailure = createAction(
  '[Storage] Save Storage Card Failure',
  props<{ error?:unknown, message?: string }>()
);


