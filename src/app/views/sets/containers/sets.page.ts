import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { FilterModalComponent } from '@PokeTCGdex/shared-ui/filter-modal/filter-modal';
import { fromSet, Set, SetdActions } from '@PokeTCGdex/shared/sets';
import { appColors, getLastNumber, gotToTop, trackById } from '@PokeTCGdex/shared/utils/functions';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { SetsComponentState } from '../model';


@Component({
  selector: 'app-sets',
  template:`
   <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

      <div class="empty-header components-color components-background-primary ">
      </div>

      <div class="container components-background-dark">
        <h1>{{ 'COMMON.SETS' | translate }}</h1>

        <div *ngIf="!['pending','error']?.includes(status$ | async)" class="displays-center">
          <!-- FORM  -->
          <form (submit)="searchSubmit($event)">
            <ion-searchbar [placeholder]="'COMMON.BY_NAME' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
          </form>
          <!-- FILTER  -->
          <ion-button
            class="displays-center class-ion-button filter-ion-button"
            (click)="openFilterModal(yearsFilter)">
            <ion-icon name="options-outline"></ion-icon>
          </ion-button>
        </div>

        <div class="empty-div"></div>

        <ng-container *ngIf="(info$ | async) as info">
          <ng-container *ngIf="(status$ | async) as status">
            <ng-container *ngIf="status !== 'pending'; else loader">
              <ng-container *ngIf="status !== 'error'; else serverError">
                <ng-container *ngIf="info?.sets?.length > 0; else noData">

                  <app-set-card *ngFor="let set of info?.sets; let i = index; trackBy: trackById"
                    [set]="set"
                    [from]="'set'"
                    [backgroundColor]="appColors?.[getLastNumber(i)]">
                  </app-set-card>

                  <!-- INFINITE SCROLL  -->
                  <app-infinite-scroll
                    [slice]="info?.sets?.length"
                    [status]="status"
                    [total]="info?.total"
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
          <app-spinner [top]="'80%'"></app-spinner>
        </ng-template>
      </div>

      <!-- TO TOP BUTTON  -->
      <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
      </ion-fab>
    </ion-content>
  `,
  styleUrls: ['./sets.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetsPage {

  gotToTop = gotToTop;
  trackById = trackById;
  appColors = appColors;
  getLastNumber = getLastNumber;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton = false;
  search = new FormControl('');
  slice = 10;
  status$ = this.store.select(fromSet.getStatus);

  trigger = new EventEmitter<SetsComponentState>();
  componentStatus: SetsComponentState = {
    slice: this.slice,
    search:null,
    year: null,
    reload: false
  };
  info$ = this.trigger.pipe(
    startWith(this.componentStatus),
    tap(({reload}) => {
      if(!!reload){
        this.store.dispatch(SetdActions.loadSets());
      }
    }),
    switchMap(({slice, search, year}) =>
      this.store.select(fromSet.getSets).pipe(
        map((setsList) => {
          const updateSetList = search || year
                              ? this.filterSets(setsList, search, year)
                              : setsList ?? [];
          return {
            sets: updateSetList?.slice(0, slice) || [],
            total: updateSetList?.length || 0
          }
        })
      )
    )
    // ,tap(d => console.log(d))
  );


  constructor(
    private store: Store,
    public platform: Platform,
    public modalController: ModalController,
  ) { }


  // SEARCH
  searchSubmit(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.componentStatus = {
      ...this.componentStatus,
      slice: this.slice,
      search: this.search.value,
      reload: false
    };
    this.trigger.next(this.componentStatus);
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.search.reset();
    this.componentStatus = {
      ...this.componentStatus,
      slice: this.slice,
      search: null,
      reload: false
    };
    this.trigger.next(this.componentStatus);
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.search.reset();
      this.componentStatus = {
        ...this.componentStatus,
        slice: this.slice,
        search: null,
        year: null,
        reload: true
      };
      this.trigger.next(this.componentStatus);
      event.target.complete();
    }, 500);
  }

  // INIFINITE SCROLL
  loadData({event, total}) {
    setTimeout(() => {
      this.componentStatus = {
        ...this.componentStatus,
        slice: (this.componentStatus?.slice) + this.slice ,
        reload: false
      };
      this.trigger.next(this.componentStatus);
      event.target.complete();
    },500)
  }

  // OPEN FILTER MODAL
  async openFilterModal(yearFilter: string[]) {
    console.log(this.componentStatus)
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        statusComponent: this.componentStatus,
        yearFilter,
        isFromSet: true
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

  get yearsFilter(): string [] {
    const lastSetYear = 1999;
    const actualYear = new Date()?.getFullYear(); //2022
    return new Array((actualYear - lastSetYear))?.fill(lastSetYear)?.map((item, index) => {
      return (item + index)?.toString()
    })?.concat(actualYear?.toString())
  }

  filterSets(setList: Set[], search: string = null, year: string = null): Set[]{
    return (setList || [])?.filter(({name, releaseDate}) => {
      const yearCondition = releaseDate?.includes(year);
      const searCondition = name?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase());

      if(search && year) return searCondition && yearCondition;
      if(search && !year) return searCondition;
      if(year && !search) return yearCondition
    });
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }


}
