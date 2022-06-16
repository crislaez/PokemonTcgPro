import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { errorImage, sliceText } from '@pokemonTcgApp/shared/utils/helpers/functions';


@Component({
  selector: 'app-item-card',
  template:`
  <ion-card class="line-card displays-between ion-activatable ripple-parent" (click)="onClick()">
    <div class="line-card-image">
      <ion-img [src]="image" loading="lazy" (ionError)="errorImage($event)"></ion-img>
    </div>
    <div class="min-width-50">
      <ion-label *ngIf="item?.name">{{ sliceText(item?.name) }}</ion-label>
    </div>
    <div class="margin-right-5">
      <ion-icon name="chevron-forward-outline"></ion-icon>
    </div>

    <ion-ripple-effect></ion-ripple-effect>
  </ion-card>
  `,
  styleUrls: ['./item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent {

  sliceText = sliceText;
  errorImage = errorImage;

  @Input() item: any;
  @Input() from: string;
  @Output() openSingleCardModal = new EventEmitter<any>();


  constructor(private router: Router) { }


  get image(){
    return this.item?.images?.logo || this.item?.images?.small;
  }

  onClick(): void{
    if(this.from === 'infiniteScroll') this.openSingleCardModal.next(this.item);
    if(this.from === 'showMore') this.router.navigate(['/cards/' + this.item?.id], {queryParams:{name: this.item?.name}})
  }


}
