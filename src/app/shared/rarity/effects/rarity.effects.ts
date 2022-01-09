import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationActions } from '@pokemonTcgApp/shared/notification';
import { EntityStatus } from '@pokemonTcgApp/shared/utils/helpers/functions';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as RarityActions from '../actions/rarity.actions';
import { RarityService } from '../services/rarity.service';


@Injectable()
export class RarityEffects {

  loadSets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RarityActions.loadRarities),
      switchMap(() => {
        return this._rarity.getAllRarities().pipe(
          map((rarities) => RarityActions.saveRarities({ rarities, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              RarityActions.saveRarities({ rarities:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_RARITIES'})
            )
          })
        )
      })
    )
  });

  initLoadRarities$ = createEffect(() => {
    return of(RarityActions.loadRarities())
  });


  constructor(
    private actions$: Actions,
    private _rarity: RarityService,
    public toastController: ToastController,
  ) { }


}
