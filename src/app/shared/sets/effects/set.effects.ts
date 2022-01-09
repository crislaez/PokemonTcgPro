import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationActions } from '@pokemonTcgApp/shared/notification';
import { EntityStatus } from '@pokemonTcgApp/shared/utils/helpers/functions';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as SetActions from '../actions/set.actions';
import { SetService } from '../services/set.service';


@Injectable()
export class SetEffects {

  loadSets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SetActions.loadSets),
      switchMap(() => {
        return this._set.getAllSets().pipe(
          map((sets) => SetActions.saveSets({ sets, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              SetActions.saveSets({ sets:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_SETS'})
            )
          })
        )
      })
    )
  });

  initLoadSets$ = createEffect(() => {
    return of(SetActions.loadSets())
  });



  constructor(
    private actions$: Actions,
    private _set: SetService,
    public toastController: ToastController,
  ) { }


}
