import { Filter } from "@PokeTCGdex/shared/models";
import { Type } from "@PokeTCGdex/shared/types/models";
import { EntityStatus } from "@PokeTCGdex/shared/utils/functions";

export interface CardComponentState {
  page?: number;
  filter?: Filter;
  refresh?: boolean;
}


export interface CardFilters {
  status: EntityStatus
  subTypes: string[];
  superTypes: string[]
  types: Type[];
}
