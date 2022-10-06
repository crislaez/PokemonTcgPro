import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { NotificationModal } from '@PokeTCGdex/shared-ui/notification-modal/notification-modal';

@Component({
  selector: 'app-root',
  template:`
    <ion-app >
      <ion-header class="ion-no-border">
        <ion-toolbar *ngIf="(currentSection$ | async) as currentSection">

          <ion-back-button
            *ngIf="!isNotShowBackButtons?.includes(currentSection?.route)"
            class="text-color"
            slot="start"
            [defaultHref]="redirectTo(currentSection)"
            [text]="''">
          </ion-back-button>

          <ion-title
            class="text-color"
            slot="start">
            {{ 'COMMON.TITLE' | translate }}
          </ion-title>

          <ion-icon
            class="text-color"
            slot="end"
            name="ellipsis-horizontal-outline"
            (click)="presentModal()">
          </ion-icon>
        </ion-toolbar>
      </ion-header>


      <!-- RUTER  -->
      <ion-router-outlet id="main"></ion-router-outlet>

      <!-- TAB FOOTER  -->
      <!-- <ion-tabs *ngIf="currentSection$ | async as currentSection">
        <ion-tab-bar [translucent]="true" slot="bottom">
          <ion-tab-button [ngClass]="{'active-class': ['home']?.includes(currentSection)}" class="text-color-light" [routerLink]="['home']">
            <ion-icon name="document-text-outline"></ion-icon>
          </ion-tab-button>

          <ion-tab-button [ngClass]="{'active-class': ['search']?.includes(currentSection)}" class="text-color-light" [routerLink]="['search']">
            <ion-icon name="search-outline"></ion-icon>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs> -->

    </ion-app>
  `,
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  isNotShowBackButtons = ['home'];

  currentSection$ = this.router.events.pipe(
    filter((event: any) => event instanceof NavigationStart),
    map((event: NavigationEnd) => {
      const { url = ''} = event || {};
      const [, route = null ] = url?.split('/') || url

      return {
        'home':{label:'COMMON.TITLE', route:'home'},
        'cards':{label:'COMMON.TITLE', route:'cards'},
        'sets': {label:'COMMON.TITLE', route:'sets'},
        'set': {label:'COMMON.TITLE', route:'set'},
        'storage':{label:'COMMON.TITLE', route:'storage'},
        // '/banlist':{label:'COMMON.TITLE', route:'banlist'},
      }[route] || {llabel:'COMMON.TITLE', route:'home'}
    })
    // tap(d => console.log(d))
  )

  constructor(
    private router: Router,
    private modalController: ModalController,
  ) {}


  redirectTo(currentSection:any): string{
    const { route = null} = currentSection || {};
    if(route === 'set') return '/sets'
    return '/home';
  }

  // OPEN FILTER MODAL
  async presentModal() {
    const modal = await this.modalController.create({
      component: NotificationModal,
    });

    modal.present();
    await modal.onDidDismiss();
  }

}
