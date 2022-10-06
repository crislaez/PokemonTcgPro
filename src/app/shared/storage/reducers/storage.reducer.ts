import { createReducer, on } from '@ngrx/store';
import { EntityStatus } from '@PokeTCGdex/shared/utils/functions';
import * as StorageActions from '../actions/storage.actions';
import { StorageCard } from '../model';

export const storageFeatureKey = 'storage';

export interface State {
  status: EntityStatus;
  cards?: StorageCard[];
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  cards: [],
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(StorageActions.loadStorageCards, (state): State => ({
    ...state,
    error: undefined,
    status: EntityStatus.Pending
  })),
  on(StorageActions.loadStorageCardsSuccess, (state, { cards }): State => ({
    ...state,
    cards,
    error: undefined,
    status: EntityStatus.Loaded
  })),
  on(StorageActions.loadStorageCardsFailure, (state, { error }): State => ({
    ...state,
    cards:[],
    error, status: EntityStatus.Loaded
  })),


  on(StorageActions.deleteStorageCard, (state): State => ({
    ...state,
    error: undefined,
    status: EntityStatus.Pending
  })),
  on(StorageActions.deleteStorageCardSuccess, (state): State => ({
    ...state,
    status: EntityStatus.Loaded
  })),
  on(StorageActions.deleteStorageCardFailure, (state, { error}): State => ({
    ...state,
    error,
    status: EntityStatus.Loaded
  })),


  on(StorageActions.saveStorageCard, (state): State => ({
    ...state,
    error: undefined,
    status: EntityStatus.Pending })),
  on(StorageActions.saveStorageCardSuccess, (state): State => ({
    ...state,
    status: EntityStatus.Loaded
  })),
  on(StorageActions.saveStorageCardFailure, (state, { error}): State => ({
    ...state,
    error,
    status: EntityStatus.Loaded
  })),

);
