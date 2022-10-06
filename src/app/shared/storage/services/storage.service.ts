import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Card } from '@PokeTCGdex/shared/card';
import { uniqueIdGeneratos } from '@PokeTCGdex/shared/utils/functions';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageCard } from '../model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  readonly cards = 'pokemonTcgCard';


  constructor() { }


  getCards(): Observable<StorageCard[]>{
    return from(this.getLocalCards()).pipe(
      map(data => (data || []))
    )
  }

  deleteCard(hashCard: string): Observable<{code:number}>{
    return from(this.getLocalCards()).pipe(
      map(storageCards => {
        const updateStorageCards = (storageCards || [])?.filter(({hash}) => hash !== hashCard);
        this.saveLocalCards(updateStorageCards)
        return {code:202}
      })
    )
  }

  saveCard(card: Card): Observable<any>{
    return from(this.getLocalCards()).pipe(
      map(storageCards => {
        let checkQuantity = (storageCards || [])?.filter(({id}) => id === card?.id);

        if(checkQuantity?.length >= 4) return {code:403};
        const hash = uniqueIdGeneratos();
        const cardToSave = {...(card ?? {}), hash};
        this.saveLocalCards([
          ...(storageCards ?? []),
          ...(card ? [cardToSave] : [])
        ]);
        return {code:200};
      })
    )
  }

  async getLocalCards(){
    const cards = await Storage.get({key: this.cards})
    return await JSON.parse(cards?.value) || []
  }

  async saveLocalCards(cards: Card[]){
    await Storage.set({key: this.cards, value: JSON.stringify(cards)})
  }


}
