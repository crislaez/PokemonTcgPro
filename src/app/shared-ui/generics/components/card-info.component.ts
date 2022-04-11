import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '@pokemonTcgApp/shared/card';
import { Type } from '@pokemonTcgApp/shared/types/models';
import { getTypeImages } from '@pokemonTcgApp/shared/utils/helpers/functions';

@Component({
  selector: 'app-card-info',
  template:`
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
  `,
  styleUrls: ['./card-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardInfoComponent {

  getTypeImages = getTypeImages;
  @Input() card: Card;
  @Input() types: Type[];


  constructor() { }


  getSuptypes(subtiles: string[]): any{
    return (subtiles || [])?.map((item, index) => {
      if(subtiles?.length === 0 || subtiles?.length === (index + 1)) return item
      return `${item} / `
    })
  }


}
