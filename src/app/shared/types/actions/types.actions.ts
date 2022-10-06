import { createAction, props } from '@ngrx/store';
import { EntityStatus } from '@PokeTCGdex/shared/utils/functions';


export const loadTypes = createAction(
  '[Types] Load Types'
);

export const saveTypes = createAction(
  '[Types] Save Types',
  props<{ types: string[], error:unknown, status:EntityStatus }>()
);



export const loadSubTypes = createAction(
  '[Types] Load SubTypes'
);

export const saveSubTypes = createAction(
  '[Types] Save SubTypes',
  props<{ subtypes: string[], error:unknown, status:EntityStatus }>()
);



export const loadSuperTypes = createAction(
  '[Types] Load SuperTypes'
);

export const saveSuperTypes = createAction(
  '[Types] Save SuperTypes',
  props<{ supertypes: string[], error:unknown, status:EntityStatus }>()
);
