import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { fromSet } from '@pokemonTcgApp/shared/sets';
import { emptyObject, gotToTop, sliceText, trackById } from '@pokemonTcgApp/shared/utils/helpers/functions';
import { map, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-show-more',
  template:`
  <!-- HEADER  -->
  <ion-header class="ion-no-border">
    <ion-toolbar mode="md|ios">
      <ion-back-button  class="text-color-light" slot="start" defaultHref="/home" [text]="''"></ion-back-button>
      <ion-title class="text-color-light" >{{ sliceText(this.title) }}</ion-title>
      <div size="small" slot="end" class="div-clear"></div>
    </ion-toolbar>
  </ion-header>

  <!-- MAIN  -->
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
    <div class="empty-header components-color components-background-primary"></div>

    <div class="container components-background-dark">

      <ng-container *ngIf="(sets$ | async) as sets; else loader">
        <ng-container *ngIf="emptyObject(sets); else noData">
        <!-- (click)="openSingleCardModal.next(card)" -->
          <ng-container *ngFor="let set of sets; let i = index; trackBy: trackById">
            <app-item-card
              [item]="set"
              [from]="'showMore'">
            </app-item-card>
          </ng-container>
        </ng-container>
      </ng-container>

      <!-- REFRESH -->
      <!-- <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher> -->

      <!-- IS ERROR -->
      <!-- <ng-template #serverError>
        <app-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'35vh'"></app-no-data>
      </ng-template> -->

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
  styleUrls: ['./show-more.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowMorePage {

  gotToTop = gotToTop;
  sliceText = sliceText;
  trackById = trackById;
  emptyObject = emptyObject;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton: boolean = false;
  title: string

  sets$ = this.route.params.pipe(
    switchMap(({set}) =>
      this.store.select(fromSet.getSets).pipe(
        map((sets) => {
          return sets?.[set]
        })
      )
    )
  );


  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.title = this.route.snapshot.params?.set
  }


  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      // this.store.dispatch(SetdActions.loadSets());
      // this.store.dispatch(RarityActions.loadRarities());
      // this.store.dispatch(TypesActions.loadTypes());
      // this.statusComponent = { slice: 4 };
      // this.infiniteScroll$.next(this.statusComponent);
      // if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
      event.target.complete();
    }, 500);
  }

}
