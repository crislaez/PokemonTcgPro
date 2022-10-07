import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '@PokeTCGdex/shared/card';
import { cardColors, getObjectKeys, isNotEmptyObject, trackById } from '@PokeTCGdex/shared/utils/functions';

@Component({
  selector: 'app-card-info',
  template: `
  <div class="div-center">
    <h2 class="text-color-light">{{ 'COMMON.INFORMATION' | translate}}</h2>
  </div>

  <ion-card class="card-card padding-6-margin">
    <ng-container *ngFor="let info of cardInformation; trackBy: trackById">
      <ng-container *ngIf="card?.[info?.field] as cardField">
        <div>
          <div class="width-40 height-30 text-color span-bold ">
            {{ info?.label | translate }}:
          </div>

          <div
            *ngIf="!['retreatCost', 'attacks', 'rules','subtypes', 'types', 'weaknesses', 'resistances']?.includes(info?.field )"
            [ngClass]="{'width-90': info?.field === 'flavorText', 'width-40': info?.field !== 'flavorText'}"
            class="height-30 text-color-light">
            {{ cardField }}
          </div>

          <ng-container *ngIf="['rules','subtypes']?.includes(info?.field )">
            <div
              [ngClass]="{'width-90': info?.field === 'rules', 'width-40': info?.field !== 'rules'}"
              class="height-30 text-color-light">
              <div *ngFor="let rule of cardField; trackBy: trackById">
                {{ rule }}
                <hr>
              </div>
            </div>
          </ng-container>

          <div *ngIf="['retreatCost']?.includes(info?.field)" class="width-40 height-30 text-color-light displays-start">
            <img loading="lazy" [src]="'assets/images/' + cardField?.[0] +'.png'"> <div class="width-20"> X {{ cardField?.length }}</div>
          </div>

          <div *ngIf="['types']?.includes(info?.field)" class="width-40 height-30 text-color-light displays-start">
            <img loading="lazy" [src]="'assets/images/' + cardField +'.png'">
          </div>

          <div *ngIf="['weaknesses', 'resistances']?.includes(info?.field)" class="width-40 height-30 text-color-light displays-start">
            <img loading="lazy" [src]="'assets/images/' + cardField?.[0]?.type +'.png'"> <div class="width-20"> {{ cardField?.[0]?.value }}</div>
          </div>

        </div>
      </ng-container>
    </ng-container>
  </ion-card>

  <!-- LEGAL  -->
  <ng-container *ngIf="isNotEmptyObject(card?.legalities)">
    <div class="div-center">
      <h2 class="text-color-light">{{ 'COMMON.LEGALITIES' | translate}}</h2>
    </div>

    <ion-card class="card-card padding-6-margin">
      <ng-container *ngFor="let key of getObjectKeys(card?.legalities); trackBy: trackById">
        <div>
          <div class="width-40 height-30 text-color span-bold ">
            {{ key }}:
          </div>
          <div class="width-40 height-30 text-color span-bold ">
            {{card?.legalities?.[key] }}
          </div>
        </div>
      </ng-container>
    </ion-card>
  </ng-container>

  <!-- ATTAKS  -->
  <ng-container *ngIf="card?.attacks?.length > 0">
    <div class="div-center">
      <h2 class="text-color-light">{{ 'COMMON.ATTAKS' | translate }}</h2>
    </div>

    <ion-card class="card-card padding-6-margin">
      <ng-container *ngFor="let attack of card?.attacks; trackBy: trackById">
        <div class="margin-bottom-30">
          <div class="width-30 displays-start">
            <img *ngFor="let cost of attack?.cost; trackBy: trackById" loading="lazy" [src]="'assets/images/' + cost +'.png'">
          </div>
          <div class="width-40 height-30 text-color span-bold ">
            {{ attack?.name }}
          </div>
          <div class="width-13 height-30 text-color-light">
            {{ attack?.damage }}
          </div>
          <div class="width-max height-30 text-color-light">
            {{ attack?.text }}
          </div>
        </div>
        <hr>
      </ng-container>
    </ion-card>
  </ng-container>

  <!-- ABILITIES  -->
  <ng-container *ngIf="card?.abilities?.length > 0">
    <div class="div-center">
      <h2 class="text-color-light">{{ 'COMMON.ABILITIES' | translate }}</h2>
    </div>

    <ion-card class="card-card padding-6-margin">
      <div *ngFor="let ability of card?.abilities; trackBy: trackById">
        <div class="width-40 height-30 text-color-light radius-10">
          {{ ability?.type }}
        </div>
        <div class="width-40 height-30 text-color span-bold">
          {{ ability?.name }}
        </div>
        <div class="width-max height-30 text-color-light">
          {{ ability?.text }}
        </div>
      </div>
    </ion-card>
  </ng-container>
  `,
  styleUrls: ['../container/card-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardInfoComponent {

  cardColors = cardColors;
  trackById = trackById;
  getObjectKeys = getObjectKeys;
  isNotEmptyObject = isNotEmptyObject;
  @Input() card: Card;
  @Input() getCardColor: string;

  cardInformation = [
    { id:1, label:'COMMON.HP', field:'hp'},
    { id:2, label:'COMMON.SUBTYPE', field:'subtypes'},
    { id:3, label:'COMMON.SUPERTYPE', field:'supertype'},
    { id:4, label:'COMMON.TYPE', field:'types'},
    { id:5, label:'COMMON.RETREAT_COST', field:'retreatCost'},
    { id:6, label:'COMMON.WEAKNESSES', field:'weaknesses'},
    { id:6, label:'COMMON.RESISTANCES', field:'resistances'},
    { id:7, label:'COMMON.REGULATION_MARK', field:'regulationMark'},
    { id:8, label:'COMMON.RARITY', field:'rarity'},
    { id:9, label:'COMMON.ARTIST', field:'artist'},
    { id:10, label:'COMMON.CODE', field:'number'},
    { id:11, label:'COMMON.EVOLVES_TO', field:'evolvesTo'},
    { id:12, label:'COMMON.EVOLVES_FROM', field:'evolvesFrom'},
    { id:13, label:'COMMON.DESCRIPTION', field:'flavorText'},
    { id:14, label:'COMMON.RULES', field:'rules'}
  ];


  constructor() { }


}
