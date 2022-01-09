import { ChangeDetectionStrategy, Component, ViewChild, EventEmitter } from '@angular/core';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { RarityActions } from '@pokemonTcgApp/shared/rarity';
import { fromSet, SetdActions } from '@pokemonTcgApp/shared/sets';
import { TypesActions } from '@pokemonTcgApp/shared/types';
import { emptyObject, errorImage, getObjectKeys, gotToTop, sliceLongText, trackById } from '@pokemonTcgApp/shared/utils/helpers/functions';
import { map, tap, startWith, switchMap } from 'rxjs/operators';
import SwiperCore, { Navigation, Pagination, SwiperOptions } from 'swiper';

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

                <ng-container *ngFor="let setKeys of getObjectKeys(sets?.data); let i = index; trackBy: trackById">
                  <div class="header no-margin-top" no-border>
                    <h3 class="text-color-light">{{ setKeys }}</h3>
                  </div>

                  <!-- SETS SLIDER  -->
                  <swiper #swiper [config]="getSliderConfig(sets?.data[setKeys])">
                    <ng-template swiperSlide *ngFor="let set of sets?.data[setKeys]; trackBy: trackById" >
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

                <!-- INFINITE SCROLL  -->
                <ng-container *ngIf="statusComponent?.slice < sets?.total">
                  <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event, sets?.total)">
                    <ion-infinite-scroll-content class="loadingspinner">
                    </ion-infinite-scroll-content>
                  </ion-infinite-scroll>
                </ng-container>

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
        <div class="error-serve">
          <div>
            <span><ion-icon class="text-color-light big-size" name="cloud-offline-outline"></ion-icon></span>
            <br>
            <span class="text-color-light">{{'COMMON.ERROR' | translate}}</span>
          </div>
        </div>
      </ng-template>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <div class="error-serve heigth-mid">
          <div>
            <span><ion-icon class="text-color-light max-size" name="clipboard-outline"></ion-icon></span>
            <br>
            <span class="text-color-light">{{'COMMON.NORESULT' | translate}}</span>
          </div>
        </div>
      </ng-template>

      <!-- LOADER  -->
      <ng-template #loader>
        <ion-spinner class="loadingspinner"></ion-spinner>
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
          return sets?.reduce((acc, el) => {
            return {
              ...(acc ? acc : []),
              [el?.series]: [
                ...(acc?.[el?.series] ? acc?.[el?.series] : []),
                ...(el ? [el] : [])
              ]
            }
          },{})
        })
        // ,tap(d => console.log(d))
        ,map(sets => {
          const filterData = (Object.entries(sets) || []).slice(0, slice).reduce((acc, el) => {
            const [ key = null, values = null ] = el || []
            return {
              ...acc,
              ...( key ? {[key]:values} : {})
            }
          },{})
          // console.log(slice)
          return {
            data: filterData,
            total: Object.keys( sets || {})?.length
          }
        })
        // ,tap(d => console.log(d))
      )
    )
  );



  // sets$ = this.store.select(fromSet.getSets).pipe(
  //   map(sets => {
  //     return sets?.reduce((acc, el) => {
  //       return {
  //         ...(acc ? acc : []),
  //         [el?.series]: [
  //           ...(acc?.[el?.series] ? acc?.[el?.series] : []),
  //           ...(el ? [el] : [])
  //         ]
  //       }
  //     },{})
  //   })
  // );


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
  loadData(event, total) {
    setTimeout(() => {
      this.statusComponent = { slice: this.statusComponent?.slice + 4 };

      if(this.statusComponent?.slice >= total){
        if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = true
      }

      this.infiniteScroll$.next(this.statusComponent);
      event.target.complete();
    }, 500);
  }

  // SLIDES CONFIG
  getSliderConfig(info:any): SwiperOptions {
    return {
      // initialSlide: 0,
      // speed: 400,
      slidesOffsetBefore: info?.length,
      slidesPerView: info?.length > 1 ? 2 : 1,
      spaceBetween: 30,
      freeMode: true,
      pagination:{   clickable: true },

      // effect:'coverflow',
      // coverflowEffect:{
      //   rotate: 50,
      //   stretch: 0,
      //   depth: 100,
      //   modifier: 1,
      //   slideShadows: true
      // }
    };
  }


}
