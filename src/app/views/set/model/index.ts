import { Filter } from '@PokeTCGdex/shared/models';
import { EntityStatus } from '@PokeTCGdex/shared/utils/functions';

export interface SetComponentState {
  setId?: string;
  page?: number;
  filter?: Filter;
  refresh?: boolean;
}

export interface SetFilters {
  status: EntityStatus
  subTypes: string[];
  superTypes: string[]
  types: Type[];
}

export interface Type {
  type: string;
  image: string
}
