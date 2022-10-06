import { Legalities, SetImages } from '@PokeTCGdex/shared/models';

export interface Set{
  "id"?:  string;
  "name"?:  string;
  "series"?:  string;
  "printedTotal"?: Number;
  "total"?: Number;
  "legalities"?: Legalities
  "ptcgoCode"?:  string;
  "releaseDate"?:  string;
  "updatedAt"?:  string;
  "images"?: SetImages;
}
