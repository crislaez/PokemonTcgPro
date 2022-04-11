import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { fromTypes } from '@pokemonTcgApp/shared/types';
import { emptyObject, errorImage, getObjectKeys, getTypeImages } from '@pokemonTcgApp/shared/utils/helpers/functions';


@Component({
  selector: 'app-card-modal',
  template: `
  <!-- HEADER  -->
  <ion-header class="ion-no-border">
    <ion-toolbar>
      <ion-title class="text-color-light">{{ this.card?.name }}</ion-title>
      <ion-buttons class="text-color-light" slot="end">
        <ion-button class="ion-button-close" (click)="dismiss()"><ion-icon fill="clear" class="text-color-light" name="close-outline"></ion-icon></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>


  <!-- MAIN  -->
  <ion-content [fullscreen]="true" [scrollEvents]="true">
    <div class="container">

      <ng-container *ngIf="emptyObject(card); else noData">
        <ion-card class="modal-ion-card ion-activatable ripple-parent">
          <ion-img class="principal-image" [src]="card?.images?.large" loading="lazy" (ionError)="errorImage($event)"></ion-img>

          <ion-card-content>
            <ng-container *ngIf="(types$ | async) as types">
              <hr>

              <!-- PRICES  -->
              <app-card-prices
                [card]="card">
              </app-card-prices>

              <!-- MOSTER ABILITIES  -->
              <ng-container *ngIf="card?.abilities?.length > 0">
                <hr>
                <div class="ion-card-content-container displays-around text-color-light">
                  <div class="width-90 big-size text-center span-bold">{{ 'COMMON.ABILITIES' | translate }}</div>

                  <ng-container *ngFor="let ability of card?.abilities">
                    <div class="width-90 mediun-size text-center">{{ ability?.type }} - {{ ability?.name }}</div>
                    <div class="width-90 mediun-size text-center">{{ ability?.text }}</div>
                  </ng-container>
                </div>
              </ng-container>

              <!-- NO MONSTER RULES  -->
              <ng-container *ngIf="card?.rules?.length > 0">
                <hr>
                <div class="ion-card-content-container displays-around text-color-light">
                  <div class="width-90 big-size text-center span-bold">{{ 'COMMON.RULES' | translate }}</div>

                  <ng-container *ngFor="let rule of card?.rules">
                    <div class="width-90 mediun-size text-center">{{ rule }}</div>
                  </ng-container>
                </div>
              </ng-container>

              <hr>

              <!-- INFORMATION  -->
              <app-card-info
                [card]="card"
                [types]="types">
              </app-card-info>

              <!-- ATTACKS  -->
              <ng-container *ngIf="card?.attacks">
                <hr>
                <app-card-attack
                  [card]="card"
                  [types]="types">
                </app-card-attack>
              </ng-container>

              <hr>

              <!-- OTHERS  -->
              <app-card-others
                [card]="card"
                [types]="types">
              </app-card-others>

            </ng-container>
          </ion-card-content>

          <!-- RIPPLE EFFECT  -->
          <ion-ripple-effect></ion-ripple-effect>
        </ion-card>
      </ng-container>


      <!-- IS NO DATA  -->
      <ng-template #noData>
        <app-no-data [title]="'COMMON.NORESULT_ONLY'" [image]="'assets/images/empty.png'" [top]="'20vh'"></app-no-data>
      </ng-template>
    </div>

  </ion-content>
  `,
  styleUrls: ['./card-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardModalComponent {

  errorImage = errorImage;
  emptyObject = emptyObject;
  getObjectKeys = getObjectKeys;
  getTypeImages = getTypeImages;
  @Input() card: any;

  types$ = this.store.select(fromTypes.getTypes);


  constructor(
    public platform: Platform,
    private modalController: ModalController,
    private store: Store
  ) { }


  // CLOSE MODAL
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}
