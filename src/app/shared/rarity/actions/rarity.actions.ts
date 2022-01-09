import { createAction, props } from '@ngrx/store';
import { EntityStatus } from '@pokemonTcgApp/shared/utils/helpers/functions';


export const loadRarities = createAction(
  '[Rarities] Load Sets'
);

export const saveRarities = createAction(
  '[Rarities] Save Rarities',
  props<{ rarities: string[], error:unknown, status:EntityStatus }>()
);
