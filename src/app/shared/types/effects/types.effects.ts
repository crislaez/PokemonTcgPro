import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationActions } from '@pokemonTcgApp/shared/notification';
import { EntityStatus } from '@pokemonTcgApp/shared/utils/helpers/functions';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as TypesActions from '../actions/types.actions';
import { TypesService } from '../services/types.service';


@Injectable()
export class TypesEffects {

  loadTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TypesActions.loadTypes),
      switchMap(() => {
        return this._types.getAllTypes().pipe(
          map((types) => TypesActions.saveTypes({ types, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              TypesActions.saveTypes({ types:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_TYPES'})
            )
          })
        )
      })
    )
  });

  loadSubTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TypesActions.loadSubTypes),
      switchMap(() => {
        return this._types.getAllSubTypes().pipe(
          map((subtypes) => TypesActions.saveSubTypes({ subtypes, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              TypesActions.saveSubTypes({ subtypes:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_SUBTYPES'})
            )
          })
        )
      })
    )
  });

  loadSuperTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TypesActions.loadSuperTypes),
      switchMap(() => {
        return this._types.getAllSuperTypes().pipe(
          map((supertypes) => TypesActions.saveSuperTypes({ supertypes, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              TypesActions.saveSuperTypes({ supertypes:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_SUPERTYPES'})
            )
          })
        )
      })
    )
  });

  initLoadTypes$ = createEffect(() => {
    return of(
      TypesActions.loadTypes(),
      TypesActions.loadSubTypes(),
      TypesActions.loadSuperTypes()
    )
  });



  constructor(
    private actions$: Actions,
    private _types: TypesService,
    public toastController: ToastController,
  ) { }


}
