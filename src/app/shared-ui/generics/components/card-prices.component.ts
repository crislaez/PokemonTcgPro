import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '@pokemonTcgApp/shared/card';

@Component({
  selector: 'app-card-prices',
  template:`
   <div class="ion-card-content-container displays-around text-color-light">
      <div class="width-90 big-size text-center span-bold">{{ 'COMMON.MARKETS' | translate }}</div>

      <ng-container *ngIf="card?.cardmarket">
        <a [href]="card?.cardmarket?.url" class="width-90 big-size-medium text-center">{{ 'COMMON.CARDMARKET' | translate }}</a>

        <div class="width-40 mediun-size span-bold">{{ 'COMMON.UPDATE_AT' | translate }}:</div>
        <div class="width-40 mediun-size">{{ card?.cardmarket?.updatedAt }}</div>

        <div class="width-max mediun-size text-center span-bold">{{ 'COMMON.CARDMARKET' | translate }} {{ 'COMMON.ALL_PRICES' | translate }}</div>

        <ng-container *ngFor="let price of getCardMakert(card?.cardmarket?.prices)">
          <div class="width-25 mediun-size span-bold">{{ price?.key | translate }}:</div>
          <div class="width-25 mediun-size text-color-primary">{{ price?.value | currency:'USD':'symbol' }}</div>
        </ng-container>
      </ng-container>

      <ng-container *ngIf="card?.tcgplayer">
        <a [href]="card?.tcgplayer?.url" class="width-90 big-size-medium text-center">{{ 'COMMON.TCGPLAYER' | translate }}</a>

        <div class="width-40 mediun-size span-bold">{{ 'COMMON.UPDATE_AT' | translate }}:</div>
        <div class="width-40 mediun-size">{{ card?.tcgplayer?.updatedAt }}</div>

        <div class="width-max mediun-size text-center span-bold">{{ 'COMMON.TCGPLAYER' | translate }} {{ 'COMMON.ALL_PRICES' | translate }}</div>

        <ng-container *ngFor="let price of getTCGPlayerPrices(card?.tcgplayer?.prices)">
          <div class="width-25 mediun-size span-bold">{{ price?.key }}:</div>
          <div class="width-25 mediun-size text-color-primary">{{ price?.value | currency:'USD':'symbol' }}</div>
        </ng-container>
      </ng-container>

    </div>
  `,
  styleUrls: ['./card-prices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPricesComponent {

  @Input() card: Card;
  pricesCardMaket: {[key:string]:string} = {
    'trendPrice':'COMMON.PRICE_TREND',
    'avg1':'COMMON.1_DAY_AVERAGE',
    'avg7':'COMMON.7_DAY_AVERAGE',
    'avg30':'COMMON.30_DAY_AVERAGE',
  };


  constructor() { }


  getTCGPlayerPrices(prices: any): {key:string, value:string}[] {
    let result = [];
    Object.keys(prices || {}).forEach((key) => {
      Object.keys(prices?.[key] || {}).forEach(secondKey => {
        if(secondKey !== 'directLow'){
          result = [
            ...result,
            {
              key:`${key} ${secondKey}`,
              value:prices?.[key]?.[secondKey]
            }
          ];
        }
      });
    });
    return result
  }

  getCardMakert(prices: any):{key:string, value:string}[] {
    let result = [];
    const selectedItems = ['trendPrice','avg1','avg7','avg30'];
    Object.keys(prices || {}).forEach((key) => {
      if(selectedItems?.includes(key)){
        result = [
          ...result,
          {
            key:this.pricesCardMaket[key],
            value:prices?.[key]
          }
        ];
      }
    });
    return result
  }

}
