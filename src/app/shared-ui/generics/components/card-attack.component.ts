import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '@pokemonTcgApp/shared/card';
import { Type } from '@pokemonTcgApp/shared/types/models';
import { getTypeImages } from '@pokemonTcgApp/shared/utils/helpers/functions';


@Component({
  selector: 'app-card-attack',
  template:`
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
  `,
  styleUrls: ['./card-attack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardAttackComponent {

  getTypeImages = getTypeImages;
  @Input() card: Card;
  @Input() types: Type[];


  constructor() { }


}
