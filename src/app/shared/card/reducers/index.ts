import { combineReducers } from "@ngrx/store";
import * as fromCardList from "./card.reducer";
import * as fromSetCard from "./set-card.reducer";

export const combineFeatureKey = 'card';

export interface CombineState {
  [fromCardList.cardListFeatureKey]: fromCardList.State;
  [fromSetCard.setCardFeatureKey]: fromSetCard.State;
};

export const reducer = combineReducers({
  [fromCardList.cardListFeatureKey]: fromCardList.reducer,
  [fromSetCard.setCardFeatureKey]: fromSetCard.reducer
});
