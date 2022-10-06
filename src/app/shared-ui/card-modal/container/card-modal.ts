import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Card } from '@PokeTCGdex/shared/card';
import { cardColors, errorImage, getObjectKeys, isNotEmptyObject, trackById } from '@PokeTCGdex/shared/utils/functions';


@Component({
  selector: 'app-card-modal',
  template: `
  <!-- HEADER  -->
  <ion-header class="ion-no-border"
    [ngStyle]="{'background':getCardColor(card)}">
    <ion-toolbar>
      <ion-title class="text-color-light">{{ this.card?.name }}</ion-title>
      <ion-buttons class="text-color-light" slot="end">
        <ion-button class="ion-button-close" (click)="dismiss()"><ion-icon fill="clear" class="text-color-light" name="close-outline"></ion-icon></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <!-- MAIN  -->
  <ion-content [fullscreen]="true" [scrollEvents]="true">
    <div class="empty-header-mid"
      [ngStyle]="{'background':getCardColor(card)}">
    </div>

    <div class="container components-background-dark">
      <ng-container *ngIf="isNotEmptyObject(card); else noData">
        <ion-card class="banner-card card-card">
          <ion-img
            loading="lazy"
            [src]="card?.images?.large"
            [alt]="card?.images?.large"
            (ionError)="errorImage($event)">
          </ion-img>
        </ion-card>
      </ng-container>


      <ion-segment (ionChange)="segmentChanged($event)" [(ngModel)]="selected">
        <ion-segment-button
          *ngFor="let item of segmentItems; trackBy: trackById"
          [value]="item?.value">
          <ion-label class="span-bold">{{ item?.label | translate }}</ion-label>
        </ion-segment-button>
      </ion-segment>

      <app-card-info
        *ngIf="['information','']?.includes(selected)"
        [card]="card"
        [getCardColor]="getCardColor(card)">
      </app-card-info>

      <app-card-set
        *ngIf="selected === 'set'"
        [card]="card"
        [getCardColor]="getCardColor(card)"
        (close)="dismiss()">
      </app-card-set>

      <app-card-price
        *ngIf="selected === 'prices'"
        [card]="card"
        (close)="dismiss()">
      </app-card-price>


      <!-- IS NO DATA  -->
      <ng-template #noData>
        <app-no-data [title]="'COMMON.NORESULT_ONLY'" [image]="'assets/images/empty.png'" [top]="'20vh'"></app-no-data>
      </ng-template>
    </div>

  </ion-content>
  `,
  styleUrls: ['./card-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardModalComponent {

  cardColors = cardColors;
  trackById = trackById;
  errorImage = errorImage;
  getObjectKeys = getObjectKeys;
  isNotEmptyObject = isNotEmptyObject;
  @Input() card: Card;

  selected = 'information';

  segmentItems = [
    {id:1, label:'COMMON.INFORMATION', value:'information'},
    {id:2, label:'COMMON.SET', value:'set'},
    {id:3, label:'COMMON.PRICES', value:'prices'}
  ];


  constructor(
    public platform: Platform,
    private modalController: ModalController,
  ) { }


  getCardColor(card: Card): string {
    const [ color = null] = card?.types || [];
    return cardColors?.[color] || cardColors?.Colorless;
  }

  segmentChanged(event): void{
    const { detail:{value = ''} } = event || {};
    this.selected = value
  }

  // CLOSE MODAL
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}
