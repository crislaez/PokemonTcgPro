import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, IonInfiniteScroll, ModalController, Platform, PopoverController } from '@ionic/angular';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CardModalComponent } from '@PokeTCGdex/shared-ui/card-modal/container/card-modal';
import { CardOptionComponent } from '@PokeTCGdex/shared-ui/card-option/card-option';
import { FilterModalComponent } from '@PokeTCGdex/shared-ui/filter-modal/filter-modal';
import { Card, CardActions, fromCard } from '@PokeTCGdex/shared/card';
import { StorageActions } from '@PokeTCGdex/shared/storage';
import { errorImage, gotToTop, sliceText, trackById } from '@PokeTCGdex/shared/utils/functions';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { CardComponentState, CardFilters } from '../model';
import * as fromCardPage from '../selectors/card.selectors';


@Component({
  selector: 'app-cards',
  template:`
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

      <div class="empty-header components-color components-background-primary ">
      </div>

      <div class="container components-background-dark">
        <h1>{{ 'COMMON.CARDS' | translate }} {{ title }}</h1>

        <div *ngIf="!['pending','error']?.includes(status$ | async)" class="displays-center">
          <!-- FORM  -->
          <form (submit)="searchSubmit($event)">
            <ion-searchbar [placeholder]="'COMMON.BY_NAME' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
          </form>
          <!-- FILTER  -->
          <ion-button
            *ngIf="(filters$ | async) as filters"
            class="displays-center class-ion-button filter-ion-button"
            (click)="openFilterModal(filters)">
            <ion-icon name="options-outline"></ion-icon>
          </ion-button>
        </div>

        <div class="empty-div"></div>

        <ng-container *ngIf="info$ | async as info">
          <ng-container *ngIf="status$ | async as status">
            <ng-container *ngIf="status !== 'pending' || componentStatus?.page > 1; else loader">
              <ng-container *ngIf="status !== 'error'; else serverError">
                <ng-container *ngIf="info?.cards?.length > 0; else noData">

                  <app-pokemon-card *ngFor="let card of info?.cards; let i = index; trackBy: trackById"
                    [card]="card"
                    [from]="'set'"
                    (openSingleCardModal)="openSingleCardModal($event)"
                    (presentPopoverTrigger)="presentPopover($event)">
                  </app-pokemon-card>

                  <!-- INFINITE SCROLL  -->
                  <app-infinite-scroll
                    [slice]="info?.cards?.length"
                    [status]="status"
                    [total]="info?.total"
                    (loadDataTrigger)="loadData($event,info?.page)">
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
          <app-spinner [top]="'80%'"></app-spinner>
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

  filters$ = this.store.select(fromCardPage.cardSelectors)

  status$ = this.store.select(fromCard.selectStatus).pipe(shareReplay(1));
  total$ = this.store.select(fromCard.selectTotalCount);
  trigger = new EventEmitter<CardComponentState>();
  componentStatus: CardComponentState;
  info$ = this.trigger.pipe(
    concatLatestFrom(() => this.store.select(fromCard.selectFilters)),
    tap(([{filter, page, refresh}, storeFilter]) => {

      if(page > 1 ||!!refresh){
        this.store.dispatch(CardActions.loadCards({page, filter}))
      }

      if(!refresh){
        const { name = null, types = null, supertypes = null, subtypes = null } = storeFilter || {};
        this.search.setValue(name);

        this.componentStatus = {
          ...this.componentStatus,
          filter:{
            ...this.componentStatus?.filter,
            ...(name ? {name} : {}),
            ...(types ? {types} : {}),
            ...(supertypes ? {supertypes} : {}),
            ...(subtypes ? {subtypes} : {})
          }
        };
      }

    }),
    switchMap(() =>
      this.store.select(fromCard.selectCards).pipe(
        concatLatestFrom(() => [
          this.store.select(fromCard.selectPage),
          this.store.select(fromCard.selectTotalCount)
        ]),
        map(([cards = [], page = 1, total = 0]) => ({cards, page, total}))
      )
    )
    // ,tap(d => console.log(d))
  );


  constructor(
    private store: Store,
    public platform: Platform,
    private route: ActivatedRoute,
    public modalController: ModalController,
    public popoverController: PopoverController
  ) {
    this.title = this.route.snapshot.queryParamMap.get('name');
  }


  // INIT COMPONENT
  ionViewWillEnter(){
    this.search.reset();
    this.componentStatus = {
      page: 1,
      filter: {},
      refresh: false
    };
    this.trigger.next(this.componentStatus);
  }

  // SEARCH
  searchSubmit(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.componentStatus = {...this.componentStatus,  page:1, filter:{...(this.componentStatus?.filter ?? {}), name:this.search.value }, refresh: true};
    this.trigger.next(this.componentStatus);
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.search.reset();
    this.componentStatus = {...this.componentStatus, page:1 , filter:{...(this.componentStatus.filter ?? {}), name: ''}, refresh: true };
    this.trigger.next(this.componentStatus);
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  // INIFINITE SCROLL
  loadData({event, total}, statusPage: number) {
    this.componentStatus = {...this.componentStatus, page:(statusPage + 1) };
    this.trigger.next(this.componentStatus)
    event.target.complete();
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.search.reset();
      this.componentStatus = {filter: {}, page: 1, refresh: true};
      this.trigger.next(this.componentStatus);
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
  async openFilterModal( types: CardFilters ) {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        statusComponent: this.componentStatus,
        typesFilter: types?.types || [],
        subtypesFilter: types?.subTypes ||[],
        supertypesFilter: types?.superTypes || []
      },
      breakpoints: [0, 0.2, 0.5, 1],
      initialBreakpoint: 0.35, //modal height
    });

    modal.present();
    const { data = null } = await modal.onDidDismiss();
    if(!data || Object.keys(data || {})?.length === 0) return;

    this.componentStatus = { ...data, refresh:true };
    this.trigger.next(this.componentStatus)
  }

  async presentPopover({event, card}) {
    const popover = await this.popoverController.create({
      component: CardOptionComponent,
      cssClass: 'my-custom-class',
      event: event,
      translucent: true,
      componentProps:{
        button:'save'
      }
    });
    await popover.present();
    const { role, data = null } = await popover.onDidDismiss();
    if(data) this.store.dispatch(StorageActions.saveStorageCard({card}))
  }



}
