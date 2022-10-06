import { createSelector } from "@ngrx/store";
import { fromTypes } from "@PokeTCGdex/shared/types";
import { EntityStatus } from "@PokeTCGdex/shared/utils/functions";

export const cardSelectors = createSelector(
  fromTypes.selectTypes,
  fromTypes.selectTypeStatus,
  fromTypes.selectSubtype,
  fromTypes.selectSubtypeStatus,
  fromTypes.selectSupertype,
  fromTypes.selectSupertypeStatus,
  (types = [], typesStatus, subTypes = [], subTypesStatus, superTypes = [], superTypesStatus) => {
    return {
      types,
      subTypes,
      superTypes,
      status: [typesStatus, subTypesStatus, superTypesStatus]?.includes(EntityStatus.Pending)
            ? EntityStatus.Pending
            : EntityStatus.Loaded
    }
  }

)
