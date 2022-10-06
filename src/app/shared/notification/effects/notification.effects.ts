import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import * as NotificationActions from '../actions/notification.actions';


@Injectable()
export class NotificationEffects {


  notificationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.notificationSuccess),
      tap(({message}) => this.presentToast(this.translate.instant(message), 'success')),
    ), { dispatch: false }
  );

  notificationFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.notificationFailure),
      tap(({message}) => this.presentToast(this.translate.instant(message), 'danger')),
    ), { dispatch: false }
  );


  constructor(
    private actions$: Actions,
    private translate: TranslateService,
    public toastController: ToastController,
  ) { }


  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 1000,
      cssClass: 'toast-wrapper'
    });
    toast.present();
  }

}
