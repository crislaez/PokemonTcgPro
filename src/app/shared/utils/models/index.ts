export interface Attack{
  "name"?: string;
  "cost"?: string [];
  "convertedEnergyCost"?: Number;
  "damage"?: string;
  "text"?: string;
}

export interface Weakness{
  "type"?: string;
  "value"?: string;
}

export interface Legalities{
  "unlimited"?: string;
  "expanded"?: string;
}

export interface CardImages{
  "small"?: string;
  "large"?: string;
}

export interface Market{
  "url"?: string;
  "updatedAt"?: string;
  "prices"?:any
}


export interface Holofoil{
  "low"?: Number;
  "mid"?: Number;
  "high"?: Number;
  "market"?: Number;
  "directLow"?: Number;
}

export interface SetImages{
  "symbol"?: string;
  "logo"?: string;
}

export interface Filter{
  "setName"?: string;
  "name"?: string;
  "types"?: string;
  "subtypes"?:string
  "supertypes"?:string
}
