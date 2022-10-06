import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '@PokeTCGdex/shared/card';
import { isNotEmptyObject, trackById } from '@PokeTCGdex/shared/utils/functions';

@Component({
  selector: 'app-card-price',
  template: `
  <div class="div-center">
    <h2 class="text-color-light">{{ 'COMMON.PRICES' | translate}}</h2>
  </div>

  <ion-card class="card-card padding-6-margin" *ngIf="isNotEmptyObject(card?.cardmarket) || isNotEmptyObject(card?.tcgplayer); else noData">
    <ng-container *ngIf="isNotEmptyObject(card?.cardmarket)">
      <div class="width-max height-30 text-color-light span-bold">
        <a [href]="card?.cardmarket.url">{{ 'COMMON.CARDMARKET' | translate }}</a>
      </div>

      <div *ngFor="let item of cardMarketIterate; trackBy: trackById" class="displays-start">
        <div class="width-40 height-30 text-color-light span-bold">
          {{ item?.label | translate }}
        </div>
        <div class="width-40 height-30 text-color-primary">
          {{ card?.cardmarket?.prices?.[item?.field] | currency:'USD':'symbol':'1.2-2' }}
        </div>
      </div>
    </ng-container>
    <hr>
    <ng-container *ngIf="isNotEmptyObject(card?.tcgplayer)">
      <div class="width-max height-30 text-color-light span-bold">
        <a [href]="card?.tcgplayer.url">{{ 'COMMON.TCGPLAYER' | translate }}</a>
      </div>

      <div *ngFor="let item of tcgPlayerIterate; trackBy: trackById" class="displays-start">
        <div class="width-40 height-30 text-color-light span-bold">
          {{ item?.label | translate }}
        </div>
        <div class="width-40 height-30 text-color-primary">
          {{ card?.tcgplayer?.prices?.holofoil?.[item?.field] | currency:'USD':'symbol':'1.2-2' }}
        </div>
      </div>
    </ng-container>
  </ion-card>

  <!-- IS NO DATA  -->
  <ng-template #noData>
    <app-no-data [title]="'COMMON.NORESULT_ONLY'" [image]="'assets/images/empty.png'" [top]="'5vh'"></app-no-data>
  </ng-template>
  `,
  styleUrls: ['../container/card-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPriceComponent {

  trackById = trackById;
  isNotEmptyObject = isNotEmptyObject;
  @Input() card: Card;
  cardMarketIterate = [
    {id:1, label:'COMMON.PRICE_TREND', field:'trendPrice'},
    {id:1, label:'COMMON.1_DAY_AVERAGE', field:'avg1'},
    {id:1, label:'COMMON.7_DAY_AVERAGE', field:'avg7'},
    {id:1, label:'COMMON.30_DAY_AVERAGE', field:'avg30'}
  ];
  tcgPlayerIterate = [
    {id:1, label:'COMMON.HOLOFOIL_LOW', field:'low'},
    {id:1, label:'COMMON.HOLOFOIL_MID', field:'mid'},
    {id:1, label:'COMMON.HOLOFOIL_HIGH', field:'high'},
    {id:1, label:'COMMON.HOLOFOIL_MARKET', field:'market'}
  ];

  constructor() { }

}
