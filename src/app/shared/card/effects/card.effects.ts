import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationActions } from '@pokemonTcgApp/shared/notification';
import { EntityStatus } from '@pokemonTcgApp/shared/utils/helpers/functions';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as CardActions from '../actions/card.actions';
import { CardService } from '../services/card.service';


@Injectable()
export class CardEffects {

  loadCards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CardActions.loadCards),
      switchMap(({page, filter}) => {
        return this._card.getAllCards(page, filter).pipe(
          map(({cards, page, pageSize, totalCount, count}) => CardActions.saveCards({ cards, page, totalCount, filter, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              CardActions.saveCards({ cards:[], page:1, totalCount:0, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_CARDS'})
            )
          })
        )
      })
    )
  });


  constructor(
    private actions$: Actions,
    private _card: CardService,
    public toastController: ToastController,
  ) { }


}
