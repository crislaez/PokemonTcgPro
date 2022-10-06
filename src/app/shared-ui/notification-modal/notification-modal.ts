import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notification-modal',
  template:`
  <ion-header class="ion-no-border components-background-dark">
    <ion-toolbar class="components-background-dark">
      <ion-title class="text-color">{{ '' }}</ion-title>
      <ion-buttons class="text-color" slot="end">
        <ion-button class="ion-button-close" (click)="dismiss()"><ion-icon fill="clear" class="text-color" name="close-outline"></ion-icon></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content [fullscreen]="true" [scrollEvents]="true" >
    <div class="container components-color-second">
      <div class="title-wrapper displays-center">
        <h2>{{ 'COMMON.TITLE' | translate }} </h2>

        <span> {{ 'COMMON.CREATE_BY' | translate}}</span>
      </div>

      <div class="body-wrapper displays-center">
        <div>
          <p>{{ 'COMMON.APP_DESCRIPTION' | translate }}</p>
        </div>

        <div clas="empty-div"></div>

        <div>
          <p>{{ 'COMMON.APP_FIND' | translate}}</p>
        </div>

        <div clas="empty-div"></div>

        <div class="displays-center">
          <ion-icon name="mail-outline" (click)="redirect('mail')"></ion-icon>
          <ion-icon name="logo-twitter" (click)="redirect('twitter')"></ion-icon>
          <ion-icon name="logo-github" (click)="redirect('github')"></ion-icon>
        </div>

        <div clas="empty-div">
          <br>
        </div>
        <div>
          <p>{{ 'COMMON.APP_FAREWELL' | translate}}</p>
        </div>
      </div>
    </div>
  </ion-content>
  `,
  styleUrls: ['./notification-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationModal {


  constructor(
    private modalController: ModalController,
  ) { }


  // CLOSE MODAL
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  redirect(to: string): void{
    const actions = {
      'mail':() => window.location.href = 'mailto:crislaez30@gmail.com?',
      'twitter':() => window.location.href = 'https://twitter.com/crislaez',
      'github':() => window.location.href = 'https://github.com/crislaez'
    }?.[to]?.();
  }

}
