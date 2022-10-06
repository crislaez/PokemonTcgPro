import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '@PokeTCGdex/shared/card';
import { cardColors, isNotEmptyObject } from '@PokeTCGdex/shared/utils/functions';

@Component({
  selector: 'app-card-set',
  template: `
  <ng-container *ngIf="isNotEmptyObject(card?.set)">
    <div class="div-center">
      <h2 class="text-color-light">{{ 'COMMON.SET' | translate }}</h2>
    </div>

    <ion-card class="card-card padding-6-margin">
      <app-set-card
        [set]="card?.set"
        [from]="'set'"
        [backgroundColor]="getCardColor"
        (close)="close.next()">
      </app-set-card>
    </ion-card>
  </ng-container>
  `,
  styleUrls: ['../container/card-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSetComponent{

  cardColors = cardColors;
  isNotEmptyObject = isNotEmptyObject;
  @Input() card: Card;
  @Input() getCardColor: string;
  @Output() close = new EventEmitter<void>()


  constructor() { }


}
