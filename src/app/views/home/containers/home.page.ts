import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { appColors, gotToTop, trackById } from '@PokeTCGdex/shared/utils/functions';

@Component({
  selector: 'app-home',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header displays-center text-color-light components-background-primary ">
    </div>

    <div class="container components-background-dark">
      <h1>{{ 'COMMON.HOME' | translate }}</h1>
      <div class="empty-div"></div>

      <div class="container components-color-second">
        <div
          *ngFor="let item of iteratable; let i = index; trackBy: trackById"
          [routerLink]="[item?.link]"
          class="home-div displays-center ion-activatable ripple-parent"
          [ngStyle]="{'background':appColors?.[i]}">
          <div>
            {{ item?.label | translate }}
          </div>
        </div>
      </div>


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
  appColors = appColors;
  trackById = trackById;
  @ViewChild(IonContent, {static: true}) content: IonContent;

  showButton: boolean = false;
  iteratable = [
    {id:1, label:'COMMON.SETS', link:'/sets'},
    {id:2, label:'COMMON.CARDS', link:'/cards'},
    // {id:3, label:'COMMON.BANLIST', link:'/banlist'},
    {id:3, label:'COMMON.SAVED', link:'/storage'},
  ];


  constructor(
    public platform: Platform,
    public modalController: ModalController
  ) { }


  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }


}
