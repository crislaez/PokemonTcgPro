import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '@pokemonTcgApp/shared/card';
import { Type } from '@pokemonTcgApp/shared/types/models';
import { emptyObject, getObjectKeys, getTypeImages } from '@pokemonTcgApp/shared/utils/helpers/functions';


@Component({
  selector: 'app-card-others',
  template:`
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
  `,
  styleUrls: ['./card-others.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardOthersComponent {

  getTypeImages = getTypeImages;
  emptyObject = emptyObject;
  getObjectKeys = getObjectKeys;
  @Input() card: Card;
  @Input() types: Type[];


  constructor() { }


}
