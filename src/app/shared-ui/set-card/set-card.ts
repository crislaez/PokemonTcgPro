import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { errorImage, sliceText } from '@PokeTCGdex/shared/utils/functions';

@Component({
  selector: 'app-set-card',
  template:`
  <ion-card
  class="ion-activatable ripple-parent item-card"
  [ngStyle]="{'background':backgroundColor}"
  (click)="onClick()">

    <div class="item-item displays-around" >
      <div class="item-item-title displays-center" >
        <div class="span-text text-color padding-5 div-title">
          <span *ngIf="set?.name as name" class="span-bold text-center">{{ sliceText(name, 28) }}</span>
        </div>
      </div>

      <div class="item-item-types displays-around">
        <ion-chip *ngIf="set?.releaseDate as releaseDate">
          <ion-label class="text-color-light font-small">{{ releaseDate }}</ion-label>
        </ion-chip>
        <ion-chip *ngIf="set?.total as total">
          <ion-label class="text-color-light font-small">{{ total }} {{ 'COMMON.CARDS' | translate }} </ion-label>
        </ion-chip>
      </div>

      <div class="item-item-avatar displays-center">
        <ion-img loading="lazy" [src]="set?.images?.logo" [alt]="set?.images?.logo" (ionError)="errorImage($event)"></ion-img>
      </div>

    </div>

    <!-- RIPLE EFFECT  -->
    <ion-ripple-effect></ion-ripple-effect>
  </ion-card>
  `,
  styleUrls: ['./set-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetCardComponent {

  sliceText = sliceText;
  errorImage = errorImage;

  @Input() set: any;
  @Input() from: string;
  @Input() backgroundColor: string;
  @Output() close = new EventEmitter<void>();


  constructor(
    private router: Router
  ) { }


  onClick(): void {
    this.close.next();
    this.router.navigate([`/${this.from}/${this.set?.id}`],{queryParams:{name:this.set?.name}})
  }


}
