import { createAction, props } from '@ngrx/store';
import { EntityStatus } from '@pokemonTcgApp/shared/utils/helpers/functions';
import { Set } from '../models';


export const loadSets = createAction(
  '[Set] Load Sets'
);

export const saveSets = createAction(
  '[Set] Save Sets',
  props<{ sets: Set[], error:unknown, status:EntityStatus }>()
);
