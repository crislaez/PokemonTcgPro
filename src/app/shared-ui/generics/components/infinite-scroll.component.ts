import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '@pokemonTcgApp/shared/card';
import { EntityStatus, errorImage, getSliderConfig, sliceLongText, trackById, sliceText } from '@pokemonTcgApp/shared/utils/helpers/functions';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Pagination, Navigation]);


@Component({
  selector: 'app-infinite-scroll',
  template:`
    <!-- HOME PAGE  -->
    <ng-container *ngIf="from === 'home'">
      <ng-container *ngFor="let item of items; let i = index; trackBy: trackById">
        <div class="header no-margin-top">
          <div class="div-center">
            <h3 class="text-color-light">{{ item }}</h3>
            <span *ngIf="sets?.data?.[item]?.length > 5" [routerLink]="['/show-more/'+item]">{{ 'COMMON.SHEE_MORE' | translate }}</span>
          </div>
        </div>

        <!-- SETS SLIDER  -->
        <app-swiper
          [items]="sets?.data?.[item]?.slice(0,5)">
        </app-swiper>
      </ng-container>
    </ng-container>

    <!-- CARD PAGE  -->
    <ng-container *ngIf="from === 'card'">
      <ng-container *ngFor="let card of items; let i = index; trackBy: trackById">
        <app-item-card
          [item]="card"
          [from]="'infiniteScroll'"
          (openSingleCardModal)="openSingleCardModal.next($event)">
        </app-item-card>
      </ng-container>
    </ng-container>

    <!-- SEARCH PAGE  -->
    <ng-container *ngIf="from === 'search'">
      <div class="displays-around">
        <ng-container *ngFor="let card of items; let i = index; trackBy: trackById ">
          <ion-card class="card ion-card-card ion-activatable ripple-parent" (click)="openSingleCardModal.next(card)">
            <ion-img [src]="card?.images?.small" loading="lazy" (ionError)="errorImage($event)"></ion-img>
            <ion-ripple-effect></ion-ripple-effect>
          </ion-card>
        </ng-container>
      </div>
    </ng-container>

    <!-- INFINITE SCROLL  -->
    <ng-container *ngIf="total">
      <ng-container *ngIf="slice < total">
        <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event, sets?.total)">
          <ion-infinite-scroll-content>
            <app-spinner [top]="'0%'" *ngIf="$any(status) === 'pending'"></app-spinner>
          </ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </ng-container>
    </ng-container>
  `,
  styleUrls: ['./infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollComponent {

  getSliderConfig = getSliderConfig;
  trackById = trackById;
  errorImage = errorImage;
  sliceLongText = sliceLongText;
  sliceText = sliceText;
  @Input() items: any[];
  @Input() sets: {data:any, total:number}
  @Input() from: string;
  @Input() slice: number;
  @Input() status: EntityStatus;
  @Input() total: any = true;
  @Output() loadDataTrigger = new EventEmitter<{event: any, total:number}>();
  @Output() openSingleCardModal = new EventEmitter<Card>();


  constructor() { }


  // ngOnInit(): void{
  //   console.log(this.sets)
  // }

  loadData(event: any, total: number): void{
    this.loadDataTrigger.next({event, total})
  }

}
