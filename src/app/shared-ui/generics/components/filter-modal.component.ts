import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { emptyObject } from '@pokemonTcgApp/shared/utils/helpers/functions';
import { Filter } from '@pokemonTcgApp/shared/utils/models/index';


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
      <ng-container *ngIf="emptyObject(typesFilter)">
        <ion-item *ngIf="typesFilter?.length > 0" class="fade-in-card item-select font-medium width-84 big-size-medium">
          <ion-label>{{'FILTERS.BY_TYPES' | translate}}</ion-label>
          <ion-select (ionChange)="changeFilter($any($event), 'types')" [value]="statusComponent?.filter?.types" interface="action-sheet">
            <ion-select-option [value]="''">{{ 'COMMON.ALL' | translate }}</ion-select-option>
            <ion-select-option *ngFor="let type of typesFilter" [value]="type?.type">{{type?.type}}</ion-select-option>
          </ion-select>
        </ion-item>
      </ng-container>
    </div>

  </ion-content>
  `,
  styleUrls: ['./filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterModalComponent {

  emptyObject = emptyObject;
  @Input() typesFilter: {type:string, image:string}[]
  @Input() statusComponent: { page?:number, filter?:Filter }  = {};

  constructor(
    public modalController: ModalController
  ) { }


  changeFilter({detail: {value}}, filter): void{
    this.statusComponent = {
      ...this.statusComponent,
      page:1,
      filter:{
        ...this.statusComponent?.filter,
        ...( value ? {[filter]:value} : {[filter]:null})
      }
    };
    this.modalController.dismiss(this.statusComponent);
  }

  dismissModal() {
    this.modalController.dismiss(false);
  }


}
