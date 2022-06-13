import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, IonInfiniteScroll, ModalController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { CardModalComponent } from '@pokemonTcgApp/shared-ui/generics/components/card-modal.component';
import { FilterModalComponent } from '@pokemonTcgApp/shared-ui/generics/components/filter-modal.component';
import { Card, CardActions, fromCard } from '@pokemonTcgApp/shared/card';
import { fromTypes } from '@pokemonTcgApp/shared/types';
import { emptyObject, errorImage, getObjectKeys, gotToTop, sliceLongText, trackById } from '@pokemonTcgApp/shared/utils/helpers/functions';
import { Filter } from '@pokemonTcgApp/shared/utils/models';
import { combineLatest } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  template:`
  <!-- HEADER  -->
  <ion-header class="ion-no-border">
    <ion-toolbar mode="md|ios">
      <ion-title class="text-color-light" >{{'COMMON.TITLE' | translate}}</ion-title>
    </ion-toolbar>
  </ion-header>

  <!-- MAIN  -->
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-color components-background-primary displays-center">
      <ng-container *ngIf="!['pending','error']?.includes(status$ | async)">
        <!-- FORM  -->
        <form (submit)="searchSubmit($event)">
          <ion-searchbar [placeholder]="'COMMON.BY_NAME' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
        </form>
        <!-- FILTER  -->
        <ion-button *ngIf="(types$ | async) as types" class="displays-center class-ion-button filter-ion-button" (click)="openFilterModal(types)"><ion-icon name="options-outline"></ion-icon> </ion-button>
      </ng-container>
    </div>

    <div class="container components-background-dark">

      <ng-container *ngIf="cards$ | async as cards">
        <ng-container *ngIf="status$ | async as status">
          <ng-container *ngIf="status !== 'pending' || statusComponent?.page !== 1; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">

              <!-- CARDS  -->
              <ng-container *ngIf="cards?.length > 0; else noData">
                <app-infinite-scroll
                  [items]="cards"
                  [from]="'search'"
                  [slice]="statusComponent?.page"
                  [status]="status"
                  [total]="(total$ | async)"
                  (loadDataTrigger)="loadData($event)"
                  (openSingleCardModal)="openSingleCardModal($event)">
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

  </ion-content>`,
  styleUrls: ['./search.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPage {

  gotToTop = gotToTop;
  trackById = trackById;
  errorImage = errorImage;
  sliceLongText = sliceLongText;
  emptyObject = emptyObject;
  getObjectKeys = getObjectKeys;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton: boolean = false;
  search = new FormControl('');

  types$ = combineLatest([
    this.store.select(fromTypes.getTypes),
    this.store.select(fromTypes.getSubtype),
    this.store.select(fromTypes.getSupertype)
  ]).pipe(
    map(([types, subtypes, supertypes]) => ({types, subtypes, supertypes}))
  );

  status$ = this.store.select(fromCard.getStatus);
  total$ = this.store.select(fromCard.getTotalCount).pipe(shareReplay(1));
  infiniteScroll$ = new EventEmitter<{page?:number, filter?:Filter}>();
  statusComponent: { page?:number, filter?:Filter } = {
    page: 1,
    filter: {}
  };

  cards$ = this.infiniteScroll$.pipe(
    tap(({page, filter }) => {
      this.store.dispatch(CardActions.loadCards({page, filter}));
    }),
    switchMap(() =>
      this.store.select(fromCard.getCards)
    )
    // ,tap((data) => console.log(data))
  );


  constructor(
    private store: Store,
    public modalController: ModalController,
    public platform: Platform
  ) { }


  // INIT COMPONENT
  ionViewWillEnter(){
    this.search.reset();
    this.statusComponent = { page: 1, filter: {} };
    this.infiniteScroll$.next(this.statusComponent);
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
  loadData({event, total}) {
    this.statusComponent = {...this.statusComponent, page:(this.statusComponent?.page + 1) };

    if(this.statusComponent?.page >= total){
      if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = true
    }

    this.infiniteScroll$.next(this.statusComponent)
    event.target.complete();
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
  async openFilterModal( types ) {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        statusComponent: this.statusComponent,
        typesFilter: types?.types || [],
        subtypesFilter: types?.subtypes ||[],
        supertypesFilter: types?.supertypes || []
      },
      breakpoints: [0, 0.2, 0.5, 1],
      initialBreakpoint: 0.35, //modal height
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
