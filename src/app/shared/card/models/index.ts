import { Set } from "@pokemonTcgApp/shared/sets";
import { Attack, CardImages, Legalities, Market, Weakness } from "@pokemonTcgApp/shared/utils/models";

export interface Card {
  "id": string;
  "name": string;
  "supertype": string;
  "subtypes": string[];
  "hp": string;
  "types": string[];
  "evolvesTo": string[];
  "rules": string[];
  "attacks": Attack[];
  "weaknesses": Weakness[];
  "retreatCost":string[];
  "convertedRetreatCost": number
  "set": Set;
  "number": string;
  "artist": string;
  "rarity": string;
  "nationalPokedexNumbers": number[];
  "legalities": Legalities;
  "images": CardImages;
  "cardmarket": Market
  "tcgplayer": Market;
  "regulationMark": string;
  "abilities": {name:string, text:string, type:string}[]
}
