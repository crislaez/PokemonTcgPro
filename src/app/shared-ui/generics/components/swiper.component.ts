import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { errorImage, getSliderConfig, sliceLongText, trackById } from '@pokemonTcgApp/shared/utils/helpers/functions';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Pagination, Navigation]);


@Component({
  selector: 'app-swiper',
  template:`
    <swiper #swiper effect="fade" [config]="getSliderConfig(items)" >
      <ng-template swiperSlide *ngFor="let item of items; trackBy: trackById" >
        <ion-card class="slide-ion-card" [routerLink]="['/cards/' + item?.id]" [queryParams]="{name:item?.name}" >
          <ion-img class="ion-card-image" [src]="item?.images?.logo" loading="lazy" (ionError)="errorImage($event)"></ion-img>

          <ion-card-header class="font-medium">
            {{ sliceLongText(item?.name) }}
            {{ item?.releaseDate }}
          </ion-card-header>
        </ion-card>
      </ng-template>
    </swiper>
  `,
  styleUrls: ['./swiper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwiperComponent {

  getSliderConfig = getSliderConfig;
  sliceLongText = sliceLongText;
  errorImage = errorImage;
  trackById = trackById;
  @Input() items: any[];


  constructor() { }


}
