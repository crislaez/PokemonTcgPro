import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { fromTypes } from '@pokemonTcgApp/shared/types';
import { emptyObject, errorImage, getObjectKeys } from '@pokemonTcgApp/shared/utils/helpers/functions';


@Component({
  selector: 'app-card-modal',
  template: `
  <!-- HEADER  -->
  <ion-header class="ion-no-border">
    <ion-toolbar>
      <ion-title class="text-color-light">{{ this.card?.name }}</ion-title>
      <ion-buttons class="text-color-light" slot="end">
        <ion-button class="ion-button-close" (click)="dismiss()"><ion-icon fill="clear" class="text-color-light" name="close-outline"></ion-icon></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>


  <!-- MAIN  -->
  <ion-content [fullscreen]="true" [scrollEvents]="true">
    <div class="container">

      <ng-container *ngIf="emptyObject(card); else noData">
        <ion-card class="modal-ion-card ion-activatable ripple-parent">
          <ion-img  [src]="card?.images?.large" loading="lazy" (ionError)="errorImage($event)"></ion-img>

          <ion-card-content>
            <ng-container *ngIf="(types$ | async) as types">

              <hr>

              <!-- PRICES  -->
              <div class="ion-card-content-container displays-around text-color-light">
                <div class="width-90 big-size text-center span-bold">{{ 'COMMON.MARKETS' | translate }}</div>

                <ng-container *ngIf="card?.cardmarket">
                  <a [href]="card?.cardmarket?.url" class="width-90 big-size-medium text-center">{{ 'COMMON.TCGPLAYER' | translate }}</a>

                  <div class="width-40 mediun-size span-bold">{{ 'COMMON.UPDATE_AT' | translate }}:</div>
                  <div class="width-40 mediun-size">{{ card?.cardmarket?.updatedAt }}</div>

                  <div class="width-max mediun-size text-center span-bold">{{ 'COMMON.TCGPLAYER' | translate }} {{ 'COMMON.ALL_PRICES' | translate }}</div>

                  <ng-container *ngFor="let price of getCardMakert(card?.cardmarket?.prices)">
                    <div class="width-25 mediun-size span-bold">{{ price?.key | translate }}:</div>
                    <div class="width-25 mediun-size text-color-primary">{{ price?.value | currency:'USD':'symbol' }}</div>
                  </ng-container>
                </ng-container>

                <ng-container *ngIf="card?.tcgplayer">
                  <a [href]="card?.tcgplayer?.url" class="width-90 big-size-medium text-center">{{ 'COMMON.TCGPLAYER' | translate }}</a>

                  <div class="width-40 mediun-size span-bold">{{ 'COMMON.UPDATE_AT' | translate }}:</div>
                  <div class="width-40 mediun-size">{{ card?.tcgplayer?.updatedAt }}</div>

                  <div class="width-max mediun-size text-center span-bold">{{ 'COMMON.CARDMARKET' | translate }} {{ 'COMMON.ALL_PRICES' | translate }}</div>

                  <ng-container *ngFor="let price of getTCGPlayerPrices(card?.tcgplayer?.prices)">
                    <div class="width-25 mediun-size span-bold">{{ price?.key }}:</div>
                    <div class="width-25 mediun-size text-color-primary">{{ price?.value | currency:'USD':'symbol' }}</div>
                  </ng-container>
                </ng-container>

              </div>


              <!-- MOSTER ABILITIES  -->
              <ng-container *ngIf="card?.abilities?.length > 0">
                <hr>

                <div class="ion-card-content-container displays-around text-color-light">
                  <div class="width-90 big-size text-center span-bold">{{ 'COMMON.ABILITIES' | translate }}</div>

                  <ng-container *ngFor="let ability of card?.abilities">
                    <div class="width-90 mediun-size text-center">{{ ability?.type }} - {{ ability?.name }}</div>
                    <div class="width-90 mediun-size text-center">{{ ability?.text }}</div>
                  </ng-container>
                </div>
              </ng-container>

              <!-- NO MONSTER RULES  -->
              <ng-container *ngIf="card?.rules?.length > 0">
                <hr>

                <div class="ion-card-content-container displays-around text-color-light">
                  <div class="width-90 big-size text-center span-bold">{{ 'COMMON.RULES' | translate }}</div>

                  <ng-container *ngFor="let rule of card?.rules">
                    <div class="width-90 mediun-size text-center">{{ rule }}</div>
                  </ng-container>
                </div>
              </ng-container>

              <hr>

              <!-- INFORMATION  -->
              <div class="ion-card-content-container displays-around text-color-light">
                <div class="width-90 big-size text-center span-bold">{{ 'COMMON.INFORMATION' | translate }}</div>

                  <ng-container *ngIf="card?.hp; else noPokemon">
                    <div class="width-90 big-size-medium displays-around">
                      <div class="width-40"><span class="span-bold">{{ card?.name }}</span> <br> {{ card?.supertype }} - <span *ngFor="let subtype of getSuptypes(card?.subtypes)">{{ subtype }}</span> </div>
                      <div class="width-40">{{ 'COMMON.HP' | translate}} {{ card?.hp }} &nbsp; <span *ngFor="let type of card?.types"><img class="span-image" [src]="getTypeImages(type, types)"/></span></div>
                    </div>
                  </ng-container>

                  <ng-template #noPokemon>
                    <div class="width-90 big-size-medium text-center"><span class="span-bold">{{ card?.name }}</span> <br> {{ card?.supertype }} - <span *ngFor="let subtype of getSuptypes(card?.subtypes)">{{ subtype }}</span> </div>
                  </ng-template>
              </div>

              <!-- ATTACKS  -->
              <ng-container *ngIf="card?.attacks">
                <hr>

                <div class="ion-card-content-container displays-around text-color-light">
                  <div class="width-90 big-size text-center span-bold">{{ 'COMMON.ATTAKS' | translate }}</div>

                  <ng-container *ngFor="let attack of card?.attacks">
                    <div class="width-90 big-size-medium displays-around">
                      <div><span *ngFor="let type of attack?.cost"><img class="span-image" [src]="getTypeImages(type, types)"/></span></div>
                      <div>{{ attack?.name }}</div>
                      <div>{{ attack?.damage }}</div>
                    </div>
                    <div class="width-90 mediun-size text-center">{{ attack?.text }}</div>
                  </ng-container>
                </div>
              </ng-container>

              <hr>

              <!-- OTHERS  -->
              <div class="ion-card-content-container displays-around text-color-light">
                <div class="width-90 big-size text-center span-bold">{{ 'COMMON.OTHERS' | translate }}</div>

                <div class="width-40 mediun-size span-bold">{{ 'COMMON.WEAKNESS' | translate }}:</div>
                <div class="width-40 mediun-size">
                  <ng-container *ngIf="card?.weaknesses?.length > 0; else noItem">
                    <span *ngFor="let weak of card?.weaknesses"><img class="span-image" [src]="getTypeImages(weak?.type, types)"/> {{ weak?.value }}</span>
                  </ng-container>
                  <ng-template #noItem> N/A </ng-template>
                </div>

                <div class="width-40 mediun-size span-bold">{{ 'COMMON.RETREAT_COST' | translate }}:</div>
                <div class="width-40 mediun-size">
                <ng-container *ngIf="card?.retreatCost?.length > 0; else noItem">
                  <span *ngFor="let retreat of card?.retreatCost"><img class="span-image" [src]="getTypeImages(retreat, types)"/></span>
                  </ng-container>
                  <ng-template #noItem> N/A </ng-template>
                </div>

                <div class="width-40 mediun-size span-bold">{{ 'COMMON.ARTIST' | translate }}:</div>
                <div class="width-40 mediun-size">
                  <ng-container *ngIf="card?.artist; else noItem">{{ card?.artist}}</ng-container>
                  <ng-template #noItem> N/A </ng-template>
                </div>

                <div class="width-40 mediun-size span-bold">{{ 'COMMON.RARITY' | translate }}:</div>
                <div class="width-40 mediun-size">
                  <ng-container *ngIf="card?.rarity; else noItem">{{ card?.rarity}}</ng-container>
                  <ng-template #noItem> N/A </ng-template>
                </div>

                <div class="width-40 mediun-size span-bold">{{ 'COMMON.SET' | translate }}:</div>
                <div class="width-40 mediun-size">
                  <ng-container *ngIf="card?.set?.name; else noItem">{{ card?.set?.name }}</ng-container>
                  <ng-template #noItem> N/A </ng-template>
                </div>

                <div class="width-40 mediun-size span-bold">{{ 'COMMON.NUMBER' | translate }}:</div>
                <div class="width-40 mediun-size">
                  <ng-container *ngIf="card?.number; else noItem">{{ card?.number }} / {{ card?.set?.total}}</ng-container>
                  <ng-template #noItem> N/A </ng-template>
                </div>

                <div class="width-40 mediun-size span-bold">{{ 'COMMON.REGULATION_MARK' | translate }}:</div>
                <div class="width-40 mediun-size">
                  <ng-container *ngIf="card?.regulationMark; else noItem">{{ card?.regulationMark }}</ng-container>
                  <ng-template #noItem> N/A </ng-template>
                </div>

                <ng-container *ngIf="emptyObject(card?.legalities)">
                  <ng-container *ngFor="let legalityKey of getObjectKeys(card?.legalities)">
                    <div class="width-40 mediun-size span-bold">{{ legalityKey }}:</div>
                    <div class="width-40 mediun-size">
                      <ng-container *ngIf="card?.legalities?.[legalityKey]; else noItem">{{ card?.legalities?.[legalityKey] }}</ng-container>
                      <ng-template #noItem> N/A </ng-template>
                    </div>
                  </ng-container>
                </ng-container>

              </div>

            </ng-container>
          </ion-card-content>

          <!-- RIPPLE EFFECT  -->
          <ion-ripple-effect></ion-ripple-effect>
        </ion-card>
      </ng-container>


      <!-- IS NO DATA  -->
      <ng-template #noData>
        <div class="error-serve">
          <div>
            <span><ion-icon class="text-color-light max-size" name="clipboard-outline"></ion-icon></span>
            <br>
            <span class="text-color-light">{{'COMMON.NORESULT_ONLY' | translate}}</span>
          </div>
        </div>
      </ng-template>
    </div>

  </ion-content>
  `,
  styleUrls: ['./card-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardModalComponent {

  errorImage = errorImage;
  emptyObject = emptyObject;
  getObjectKeys = getObjectKeys;
  @Input() card: any;

  types$ = this.store.select(fromTypes.getTypes);
  pricesCardMaket: {[key:string]:string} = {
    'trendPrice':'COMMON.PRICE_TREND',
    'avg1':'COMMON.1_DAY_AVERAGE',
    'avg7':'COMMON.7_DAY_AVERAGE',
    'avg30':'COMMON.30_DAY_AVERAGE',
  };


  constructor(
    public platform: Platform,
    private modalController: ModalController,
    private store: Store
  ) { }



  getTypeImages(type: string, allTypes: {type: string, image: string}[]): string{
    return allTypes?.find(({type:storeType}) => storeType === type)?.image || ''
  }

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

  getSuptypes(subtiles: string[]): any{
    return (subtiles || [])?.map((item, index) => {
      if(subtiles?.length === 0 || subtiles?.length === (index + 1)) return item
      return `${item} / `
    })
  }

  // CLOSE MODAL
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}
