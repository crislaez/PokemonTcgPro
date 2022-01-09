import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, IonInfiniteScroll, ModalController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { CardModalComponent } from '@pokemonTcgApp/shared-ui/generics/components/card-modal.component';
import { FilterModalComponent } from '@pokemonTcgApp/shared-ui/generics/components/filter-modal.component';
import { Card, CardActions, fromCard } from '@pokemonTcgApp/shared/card';
import { fromTypes } from '@pokemonTcgApp/shared/types';
import { errorImage, gotToTop, sliceText, trackById } from '@pokemonTcgApp/shared/utils/helpers/functions';
import { Filter } from '@pokemonTcgApp/shared/utils/models';
import { combineLatest } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-cards',
  template:`
    <!-- HEADER  -->
    <ion-header class="ion-no-border">
      <ion-toolbar mode="md|ios">
        <ion-back-button  class="text-color-light" slot="start" defaultHref="/home" [text]="''"></ion-back-button>
        <ion-title class="text-color-light" >{{ sliceText(title) }}</ion-title>
        <div size="small" slot="end" class="div-clear"></div>
      </ion-toolbar>
    </ion-header>


    <!-- MAIN  -->
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
      <div class="empty-header components-color components-background-primary"></div>

      <div class="container components-background-dark">

        <ng-container *ngIf="cards$ | async as cards">
          <ng-container *ngIf="status$ | async as status">
            <ng-container *ngIf="status !== 'pending' || statusComponent?.page !== 1; else loader">
              <ng-container *ngIf="status !== 'error'; else serverError">

                <!-- FORM  -->
                <form (submit)="searchSubmit($event)">
                  <ion-searchbar [placeholder]="'COMMON.BY_NAME' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
                </form>

                <!-- FILTER  -->
                <ng-container *ngIf="(types$ | async) as types">
                  <div class="width-84 margin-center displays-center">
                    <ion-button class="displays-center class-ion-button" (click)="openFilterModal(types)">{{ 'COMMON.FILTERS' | translate }} <ion-icon name="options-outline"></ion-icon> </ion-button>
                  </div>
                </ng-container>

                <!-- CARDS  -->
                <ng-container *ngIf="cards?.length > 0; else noData">

                  <!-- <ng-container *ngFor="let card of cards; let i = index; trackBy: trackById ">
                    <ion-card class="ion-card-card ion-activatable ripple-parent" (click)="openSingleCardModal(card)">
                      <ion-img  [src]="card?.images?.small" loading="lazy" (ionError)="errorImage($event)"></ion-img>

                      <ion-ripple-effect></ion-ripple-effect>
                    </ion-card>
                  </ng-container> -->
                  <ion-list>
                    <ion-item detail *ngFor="let card of cards; let i = index; trackBy: trackById" (click)="openSingleCardModal(card)">
                      <ion-img [src]="card?.images?.small" loading="lazy" (ionError)="errorImage($event)"></ion-img>
                      <ion-label *ngIf="card?.name" >{{ sliceText(card?.name) }}</ion-label>
                      <ion-label *ngIf="card?.number" > # {{ card?.number }}</ion-label>
                    </ion-item>
                  </ion-list>

                  <!-- INFINITE SCROLL  -->
                  <ng-container *ngIf="(total$ | async) as total">
                    <ng-container *ngIf="statusComponent?.page < total">
                      <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event, total)">
                        <ion-infinite-scroll-content class="loadingspinner">
                          <ion-spinner *ngIf="status === 'pending'" class="loadingspinner"></ion-spinner>
                        </ion-infinite-scroll-content>
                      </ion-infinite-scroll>
                    </ng-container>
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
          <div class="error-serve">
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
  styleUrls: ['./cards.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsPage {

  gotToTop = gotToTop;
  sliceText = sliceText;
  errorImage = errorImage;
  trackById = trackById;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton: boolean = false;
  title: string = ''
  search = new FormControl('');

  types$ = this.store.select(fromTypes.getTypes);
  status$ = this.store.select(fromCard.getStatus);
  total$ = this.store.select(fromCard.getTotalCount);
  infiniteScroll$ = new EventEmitter<{page?:number, filter?:Filter}>();
  statusComponent: { page?:number, filter?:Filter } = {
    page: 1,
    filter: {
      setName: this.route.snapshot.params?.setId || ''
    }
  };

  cards$ = combineLatest([
    this.route.params,
    this.infiniteScroll$.pipe(startWith(this.statusComponent))
  ]).pipe(
    tap(([{setId}, {page, filter }]) => {
      const updateFilter = {...filter, setName: setId}
      this.store.dispatch(CardActions.loadCards({page, filter: updateFilter}))
    }),
    switchMap(() =>
      this.store.select(fromCard.getCards)
    )
    // ,tap(d => console.log(d))
  );


  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public modalController: ModalController,
    public platform: Platform
  ) {
    this.title = this.route.snapshot.queryParamMap.get('name');
  }


  ionViewWillEnter(){
    this.statusComponent = { page: 1, filter: { setName: this.route.snapshot.params?.setId || '' } };
    this.infiniteScroll$.next(this.statusComponent)
  }

  // SEARCH
  searchSubmit(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.statusComponent = {...this.statusComponent,  page:1, filter:{ ...this.statusComponent.filter, name: this.search.value } };
    this.infiniteScroll$.next(this.statusComponent);
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.search.reset();
    this.statusComponent = {...this.statusComponent, page:1 , filter:{...this.statusComponent.filter, name: ''} };
    this.infiniteScroll$.next(this.statusComponent);
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  // INIFINITE SCROLL
  loadData(event, total) {
    setTimeout(() => {
      this.statusComponent = {...this.statusComponent, page:(this.statusComponent?.page + 1) };

      if(this.statusComponent?.page >= total){
        if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = true
      }

      this.infiniteScroll$.next(this.statusComponent)
      event.target.complete();
    }, 500);
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.search.reset();
      this.statusComponent = {filter: {}, page: 1};
      this.infiniteScroll$.next(this.statusComponent);
      if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
      event.target.complete();
    }, 500);
  }

  // SHOW SINGLE CARD
  async openSingleCardModal(card: Card) {
    const modal = await this.modalController.create({
      component: CardModalComponent,
      componentProps:{
        card
      }
    });
    return await modal.present();
  }

  // OPEN FILTER MODAL
  async openFilterModal( typesFilter ) {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        statusComponent: this.statusComponent,
        typesFilter
      },
      breakpoints: [0, 0.2, 0.5, 1],
      initialBreakpoint: 0.2,
    });

    modal.onDidDismiss()
      .then((res) => {
        const { data } = res || {};
        if(!!data){
          this.statusComponent = { ...data }
          this.infiniteScroll$.next(this.statusComponent);
          if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
        }
    });

    return await modal.present();
  }



}
