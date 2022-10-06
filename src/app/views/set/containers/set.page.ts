import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, ModalController, Platform, PopoverController } from '@ionic/angular';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CardModalComponent } from '@PokeTCGdex/shared-ui/card-modal/container/card-modal';
import { CardOptionComponent } from '@PokeTCGdex/shared-ui/card-option/card-option';
import { FilterModalComponent } from '@PokeTCGdex/shared-ui/filter-modal/filter-modal';
import { Card, CardActions, fromCard } from '@PokeTCGdex/shared/card';
import { StorageActions } from '@PokeTCGdex/shared/storage';
import { appColors, getLastNumber, gotToTop, trackById } from '@PokeTCGdex/shared/utils/functions';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { SetComponentState, SetFilters } from '../model';
import * as fromSetPage from '../selectors/set.selectors';


@Component({
  selector: 'app-set',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-color components-background-primary ">
    </div>

    <div class="container components-background-dark">
      <h1>{{ 'COMMON.SET' | translate }} <span class="big-size" >{{ setName }}</span></h1>

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

      <ng-container *ngIf="(info$ | async) as info">
        <ng-container *ngIf="(status$ | async) as status">
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
  styleUrls: ['./set.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetPage {

  gotToTop = gotToTop;
  appColors = appColors;
  trackById = trackById;
  getLastNumber = getLastNumber;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton = false;
  search = new FormControl('');
  title: string;
  setName: string;
  pageSum = 1;

  filters$ = this.store.select(fromSetPage.setSelectors);
  status$ = this.route.params.pipe(
    switchMap(({setId}) =>
      this.store.select(fromCard.selectSetCardsStatus(setId))
    ),
    shareReplay(1)
  );

  trigger = new EventEmitter<SetComponentState>();
  componentStatus: SetComponentState;
  info$ = this.trigger.pipe(
    concatLatestFrom(() => this.store.select(fromCard.selectSetsList)),
    tap(([{setId, page, filter, refresh}, cardsList]) => {

      if(!cardsList?.[setId] || page > 1 || !!refresh){
        this.store.dispatch(CardActions.loadSetCards({page, setId, filter}));
      }

      if(!refresh){
        const { filter: storeFilter = null } = cardsList?.[setId] || {};
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
    switchMap(([{setId}]) =>
      this.store.select(fromCard.selectSetCardsCards(setId)).pipe(
        concatLatestFrom(() => [
          this.store.select(fromCard.selectSetCardsPage(setId)),
          this.store.select(fromCard.selectSetCardsTotalCount(setId))
        ]),
        map(([cards = [], page = 1, total = 0]) => ({cards, total, page, setId}))
      )
    )
    // ,tap(d => console.log(d))
  );


  constructor(
    private store: Store,
    public platform: Platform,
    private route: ActivatedRoute,
    public modalController: ModalController,
    public popoverController: PopoverController,
  ) { }


  // INIT
  ionViewWillEnter(): void{
    this.search.reset();
    this.setName = this.route.snapshot.queryParams?.name

    this.title = this.route.snapshot.params?.setId || '';
    this.componentStatus = {
      setId: this.title,
      page:1,
      filter:{
        setName: this.title
      },
      refresh: false
    };
    this.trigger.next(this.componentStatus);
  }

  // SEARCH
  searchSubmit(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.componentStatus = {...this.componentStatus, page:1, filter:{...(this.componentStatus?.filter ?? {}), name:this.search.value, }, refresh: true };
    this.trigger.next(this.componentStatus);
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.search.reset();
    this.componentStatus = {...this.componentStatus, page:1, filter:{...(this.componentStatus?.filter ?? {}), name: undefined }, refresh: true };
    this.trigger.next(this.componentStatus);
  }

  // INIFINITE SCROLL
  loadData({event, total}, statusPage: number) {
    this.componentStatus = {...this.componentStatus, page: (statusPage + this.pageSum), refresh: false };
    this.trigger.next(this.componentStatus);
    event.target.complete();
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.search.reset();
      this.componentStatus = { ...this.componentStatus, page: 1, filter:{ setName: this.title }, refresh: true };
      this.trigger.next(this.componentStatus);
      event.target.complete();
    }, 500);
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
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

  // OPEN FILTER MODAL
  async openFilterModal(types: SetFilters) {
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



}
