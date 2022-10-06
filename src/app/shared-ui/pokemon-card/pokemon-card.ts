import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '@PokeTCGdex/shared/card';
import { cardColors, errorImage, getObjectKeys, isNotEmptyObject, trackById } from '@PokeTCGdex/shared/utils/functions';

@Component({
  selector: 'app-pokemon-card',
  template:`
  <ion-card class="ion-activatable ripple-parent card-card displays-around"
    [ngStyle]="{ 'background':getCardColor() }"
    (click)="openSingleCardModal.next(card)"
    >
    <div class="card-title displays-around text-color">
      <div class="card-title-div span-bold">{{ card?.number }} {{ card?.name }}</div>
      <div class="card-title-icon" (click)="presentPopover($event)">
        <ion-icon name="ellipsis-vertical-outline"></ion-icon>
      </div>
    </div>

    <div class="card-item displays-around" >
      <div>
        <ng-container *ngIf="['set']?.includes(from)">
          <ng-container *ngIf="card?.types?.length > 0">
            <ion-chip *ngFor="let type of card?.types; trackBy: trackById">
              <ion-label class="text-color">{{ type }}
              </ion-label>
            </ion-chip>
          </ng-container>
          <ion-chip *ngIf="card?.rarity as rarity">
            <ion-label class="text-color-four span-bold">{{ rarity }}</ion-label>
          </ion-chip>
        </ng-container>
      </div>

      <div>
        <ion-img loading="lazy" [src]="cardImage" [alt]="card?.name" (ionError)="errorImage($event)"></ion-img>
      </div>
    </div>

    <!-- RIPLE EFFECT  -->
    <ion-ripple-effect></ion-ripple-effect>
  </ion-card>
  `,
  styleUrls: ['./pokemon-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonCardComponent {

  cardColors = cardColors;
  trackById = trackById;
  errorImage = errorImage;
  getObjectKeys = getObjectKeys;
  isNotEmptyObject = isNotEmptyObject
  @Input() card: Card;
  @Input() from: string;
  @Input() isSetName: string;
  @Input() banlistType: string;
  @Output() openSingleCardModal = new EventEmitter<Card>();
  @Output() presentPopoverTrigger = new EventEmitter<{event, card}>();


  constructor() { }


  get cardImage(): string {
    return this.card?.images?.small || '';
  }

  get subtypes(): string {
    const [ subtype = null ] = this.card?.subtypes || [];
    return subtype || '';
  }

  getCardColor(): string {
    const [ color = null] = this.card?.types || [];
    return cardColors?.[color] || cardColors?.[this.card?.supertype] || cardColors?.Colorless;
  }

  presentPopover(event): void{
    event.stopPropagation();
    this.presentPopoverTrigger.next({event, card: this.card});
  }


}
