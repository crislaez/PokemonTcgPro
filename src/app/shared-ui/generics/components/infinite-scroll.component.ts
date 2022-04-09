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
        <div class="header no-margin-top" no-border>
          <h3 class="text-color-light">{{ item }}</h3>
        </div>

        <!-- SETS SLIDER  -->
        <swiper #swiper [config]="getSliderConfig(sets?.data[item])">
          <ng-template swiperSlide *ngFor="let set of sets?.data[item]; trackBy: trackById" >
            <ion-card class="slide-ion-card" [routerLink]="['/cards/'+set?.id]" [queryParams]="{name:set?.name}" >
              <ion-img class="ion-card-image" [src]="set?.images?.logo" loading="lazy" (ionError)="errorImage($event)"></ion-img>
              <ion-card-header class="font-medium">
              {{ sliceLongText(set?.name) }}
              {{ set?.releaseDate }}
              </ion-card-header>
            </ion-card>
          </ng-template>
        </swiper>
      </ng-container>
    </ng-container>

    <!-- CARD PAGE  -->
    <ng-container *ngIf="from === 'card'">
      <ion-list>
        <ion-item detail *ngFor="let card of items; let i = index; trackBy: trackById" (click)="openSingleCardModal.next(card)">
          <ion-img [src]="card?.images?.small" loading="lazy" (ionError)="errorImage($event)"></ion-img>
          <ion-label *ngIf="card?.name" >{{ sliceText(card?.name) }}</ion-label>
          <ion-label *ngIf="card?.number" > # {{ card?.number }}</ion-label>
        </ion-item>
      </ion-list>
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


  ngOnInit(): void{
    console.log('slice -> ', this.slice)
    console.log('total -> ', this.total)
  }
  loadData(event: any, total: number): void{
    console.log(event, total)
    this.loadDataTrigger.next({event, total})
  }

}
