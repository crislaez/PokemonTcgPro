import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { RarityActions } from '@pokemonTcgApp/shared/rarity';
import { fromSet, SetdActions } from '@pokemonTcgApp/shared/sets';
import { TypesActions } from '@pokemonTcgApp/shared/types';
import { emptyObject, errorImage, getObjectKeys, getSliderConfig, gotToTop, sliceLongText, trackById } from '@pokemonTcgApp/shared/utils/helpers/functions';
import { map, startWith, switchMap } from 'rxjs/operators';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Pagination, Navigation]);


@Component({
  selector: 'app-home',
  template:`
  <!-- HEADER  -->
  <ion-header class="ion-no-border">
    <ion-toolbar mode="md|ios">
      <ion-title class="text-color-light" >{{'COMMON.TITLE' | translate}}</ion-title>
    </ion-toolbar>
  </ion-header>

  <!-- MAIN  -->
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
    <div class="empty-header components-color components-background-primary"></div>

    <div class="container components-background-dark">

      <ng-container *ngIf="status$ | async as status">
        <ng-container *ngIf="status !== 'pending' ; else loader">
          <ng-container *ngIf="status !== 'error' ; else serverError">

            <div class="header" no-border>
              <h2 class="text-color-light">{{'COMMON.LAST_SETS' | translate}}</h2>
            </div>

            <ng-container *ngIf="lastSets$ | async as lastSets">
              <ng-container *ngIf="lastSets?.length > 0; else noData">
                <!-- LAST SETS SLIDER  -->
                <swiper #swiper effect="fade" [config]="getSliderConfig(lastSets)" >
                  <ng-template swiperSlide *ngFor="let set of lastSets; trackBy: trackById" >
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

            <ng-container *ngIf="sets$ | async as sets">
              <ng-container *ngIf="emptyObject(sets?.data) else noData">
                <app-infinite-scroll
                  [items]="getObjectKeys(sets?.data)"
                  [sets]="sets"
                  [from]="'home'"
                  [slice]="statusComponent?.slice"
                  [status]="status"
                  [total]="sets.total"
                  (loadDataTrigger)="loadData($event)">
                </app-infinite-scroll>
              </ng-container>
            </ng-container>

          </ng-container>
        </ng-container>
      </ng-container>


      <!-- REFRESH -->
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <!-- IS ERROR -->
      <ng-template #serverError>
        <app-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'35vh'"></app-no-data>
      </ng-template>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <app-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'20vh'"></app-no-data>
      </ng-template>

      <!-- LOADER  -->
      <ng-template #loader>
        <app-spinner></app-spinner>
      </ng-template>
    </div>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>

  </ion-content>
  `,
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

  gotToTop = gotToTop;
  trackById = trackById;
  errorImage = errorImage;
  sliceLongText = sliceLongText;
  emptyObject = emptyObject;
  getObjectKeys = getObjectKeys;
  getSliderConfig = getSliderConfig;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  showButton: boolean = false;

  infiniteScroll$ = new EventEmitter<{slice:number}>();
  statusComponent: {slice: number} = {slice: 4};

  status$ = this.store.select(fromSet.getStatus);
  lastSets$ = this.store.select(fromSet.getLastSets);

  sets$ = this.infiniteScroll$.pipe(
    startWith(this.statusComponent),
    switchMap(({slice}) =>
      this.store.select(fromSet.getSets).pipe(
        map(sets => {
          const filterData = (Object.entries(sets) || []).slice(0, slice).reduce((acc, el) => {
            const [ key = null, values = null ] = el || []
            return {
              ...acc,
              ...( key ? {[key]:values} : {})
            }
          },{})

          return {
            data: filterData,
            total: Object.keys( sets || {})?.length
          }
        })
      )
    )
  );


  constructor(
    private store: Store
  ) { }


  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.store.dispatch(SetdActions.loadSets());
      this.store.dispatch(RarityActions.loadRarities());
      this.store.dispatch(TypesActions.loadTypes());
      this.statusComponent = { slice: 4 };
      this.infiniteScroll$.next(this.statusComponent);
      if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
      event.target.complete();
    }, 500);
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  // INIFINITE SCROLL
  loadData({event, total}) {
    this.statusComponent = { slice: this.statusComponent?.slice + 4 };

    if(this.statusComponent?.slice >= total){
      if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = true
    }

    this.infiniteScroll$.next(this.statusComponent);
    event.target.complete();
  }


}
