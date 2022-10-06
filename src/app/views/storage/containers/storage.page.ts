import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, ModalController, Platform, PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { CardModalComponent } from '@PokeTCGdex/shared-ui/card-modal/container/card-modal';
import { CardOptionComponent } from '@PokeTCGdex/shared-ui/card-option/card-option';
import { Card } from '@PokeTCGdex/shared/card';
import { fromStorage, StorageActions } from '@PokeTCGdex/shared/storage';
import { gotToTop, trackById } from '@PokeTCGdex/shared/utils/functions';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { StorageComponentState } from '../model';


@Component({
  selector: 'app-storage',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-color components-background-primary ">
    </div>

    <div class="container components-background-dark">
      <h1>{{ 'COMMON.SAVED' | translate }}</h1>

      <!--  -->
      <div  class="displays-center" >
        <!-- FORM  -->
        <form *ngIf="!['pending','error']?.includes(status$ | async)"(submit)="searchSubmit($event)">
          <ion-searchbar [placeholder]="'COMMON.BY_NAME' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
        </form>
      </div>

      <div class="empty-div"></div>

        <ng-container *ngIf="(info$ | async) as info">
          <ng-container *ngIf="(status$ | async) as status">
            <ng-container *ngIf="status !== 'pending'; else loader">
              <ng-container *ngIf="status !== 'error'; else serverError">
                <ng-container *ngIf="info?.cards?.length > 0; else noData">

                  <app-pokemon-card *ngFor="let card of info?.cards; let i = index; trackBy: trackById"
                    [card]="card"
                    [from]="'set'"
                    (openSingleCardModal)="openSingleCardModal($event)"
                    (presentPopoverTrigger)="presentPopover($event, card?.hash)">
                  </app-pokemon-card>


                  <app-infinite-scroll
                    [slice]="info?.cards?.length"
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
  styleUrls: ['./storage.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoragePage {

  gotToTop = gotToTop;
  trackById = trackById;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton = false;
  search = new FormControl('');
  slice = 10

  status$ = this.store.select(fromStorage.selectStatus)
  trigger = new EventEmitter<StorageComponentState>();
  componentStatus: StorageComponentState = {
    slice: this.slice,
    search:null,
    reload: false
  };

  info$ = this.trigger.pipe(
    startWith(this.componentStatus),
    tap(({reload}) => {
      if(reload){
        this.store.dispatch(StorageActions.loadStorageCards())
      }
    }),
    switchMap(({slice, search}) =>
      this.store.select(fromStorage.selectCards).pipe(
        map((storageCards) => {
          const filterCards = !search
                            ? storageCards
                            : (storageCards || [])?.filter(({name}) => name?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase()))
          return {
            cards: filterCards?.slice(0, slice) || [],
            total: filterCards?.length || 0
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
    public popoverController: PopoverController,
  ) { }


  // SEARCH
  searchSubmit(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.componentStatus = { slice: this.slice, search: this.search.value, reload: false };
    this.trigger.next(this.componentStatus);
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.search.reset();
    this.componentStatus = { slice: this.slice, search: undefined, reload: false };
    this.trigger.next(this.componentStatus);
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.search.reset();
      this.componentStatus = { slice: this.slice , search: undefined, reload: true };
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

  async presentPopover({event, card}, hashCard: string) {
    const popover = await this.popoverController.create({
      component: CardOptionComponent,
      cssClass: 'my-custom-class',
      event: event,
      translucent: true,
      componentProps:{
        button:'delete'
      }
    });
    await popover.present();

    const { role, data = null } = await popover.onDidDismiss();
    if(data) this.store.dispatch(StorageActions.deleteStorageCard({hashCard}))
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

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }



}
