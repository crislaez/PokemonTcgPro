import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Filter } from '@PokeTCGdex/shared/models';
import { isNotEmptyObject } from '@PokeTCGdex/shared/utils/functions';

@Component({
  selector: 'app-filter-modal',
  template:`
  <ion-content class="modal-wrapper">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons class="text-color-light" slot="end">
          <ion-button class="ion-button-close" fill="clear" (click)="dismissModal()"><ion-icon name="close-outline"></ion-icon></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <div class="displays-around height-100">
      <ng-container *ngIf="typesFilter?.length > 0" >
        <ion-item class="item-select font-medium ">
          <ion-label>{{'FILTERS.BY_TYPES' | translate}}</ion-label>
          <ion-select (ionChange)="changeFilter($any($event), 'types')" [value]="statusComponent?.filter?.types" interface="action-sheet">
            <ion-select-option [value]="''">{{ 'COMMON.ALL' | translate }}</ion-select-option>
            <ion-select-option *ngFor="let type of typesFilter" [value]="type?.type">{{type?.type}}</ion-select-option>
          </ion-select>
        </ion-item>
      </ng-container>

      <ng-container *ngIf="subtypesFilter?.length > 0" >
        <ion-item class="item-select font-medium ">
          <ion-label>{{'FILTERS.BY_SUBTYPES' | translate}}</ion-label>
          <ion-select (ionChange)="changeFilter($any($event), 'subtypes')" [value]="statusComponent?.filter?.subtypes" interface="action-sheet">
            <ion-select-option [value]="''">{{ 'COMMON.ALL' | translate }}</ion-select-option>
            <ion-select-option *ngFor="let type of subtypesFilter" [value]="type">{{type}}</ion-select-option>
          </ion-select>
        </ion-item>
      </ng-container>

      <ng-container *ngIf="supertypesFilter?.length > 0" >
        <ion-item class="item-select font-medium ">
          <ion-label>{{'FILTERS.BY_SUPERTYPES' | translate}}</ion-label>
          <ion-select (ionChange)="changeFilter($any($event), 'supertypes')" [value]="statusComponent?.filter?.supertypes" interface="action-sheet">
            <ion-select-option [value]="''">{{ 'COMMON.ALL' | translate }}</ion-select-option>
            <ion-select-option *ngFor="let type of supertypesFilter" [value]="type">{{type}}</ion-select-option>
          </ion-select>
        </ion-item>
      </ng-container>

      <ng-container *ngIf="yearFilter?.length > 0" >
        <ion-item class="item-select font-medium ">
          <ion-label>{{'FILTERS.BY_YEARS' | translate}}</ion-label>
          <ion-select (ionChange)="changeFilter($any($event), 'year')" [value]="statusComponent?.year" interface="action-sheet">
            <ion-select-option [value]="''">{{ 'COMMON.ALL' | translate }}</ion-select-option>
            <ion-select-option *ngFor="let year of yearFilter" [value]="year">{{year}}</ion-select-option>
          </ion-select>
        </ion-item>
      </ng-container>

    </div>

  </ion-content>
  `,
  styleUrls: ['./filter-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterModalComponent {

  isNotEmptyObject = isNotEmptyObject;
  @Input() isFromSet: boolean = false;
  @Input() yearFilter: string[];
  @Input() typesFilter: {type:string, image:string}[];
  @Input() subtypesFilter: string[];
  @Input() supertypesFilter: string[];
  @Input() statusComponent: any = {};


  constructor(
    public modalController: ModalController
  ) { }


  changeFilter({detail: {value}}, filter): void{
    this.statusComponent = {
      ...this.statusComponent,
      page:1,
      ...(this.isFromSet
        ? {[filter]:value}
        : {
          filter:{
            ...this.statusComponent?.filter,
            ...( value ? {[filter]:value} : {[filter]:null})
          }
        })
    };
    this.modalController.dismiss(this.statusComponent);
  }

  dismissModal() {
    this.modalController.dismiss(false);
  }



}
