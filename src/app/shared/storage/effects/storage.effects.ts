import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationActions } from '@PokeTCGdex/shared/notification';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as StorageActions from '../actions/storage.actions';
import { StorageService } from '../services/storage.service';


@Injectable()
export class StorageEffects {

  loadStorageCards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        StorageActions.loadStorageCards,
        StorageActions.saveStorageCardSuccess,
        StorageActions.deleteStorageCardSuccess
      ),
      switchMap(() => {
        return this._storage.getCards().pipe(
          map((cards) => StorageActions.loadStorageCardsSuccess({ cards })),
          catchError(error => {
            return of(
              StorageActions.loadStorageCardsFailure({error, message:'ERRORS.ERROR_LOAD_SAVE_CARDS' }),
            )
          })
        )
      })
    );
  });

  saveStorageCard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StorageActions.saveStorageCard),
      switchMap(({card}) => {
        return this._storage.saveCard(card).pipe(
          map(({code}) => {
            if(code === 403){
              return StorageActions.saveStorageCardFailure({error:code, message:'ERRORS.ERROR_LIMIT_EXCESS'});
            }

            return StorageActions.saveStorageCardSuccess({ message:'COMMON.SAVE_CARD_SUCCESS' });
          }),
          catchError(error => {
            return of(StorageActions.saveStorageCardFailure({error, message:'ERRORS.ERROR_TO_SAVE_CARDS'}))
          })
        )
      })
    );
  });

  deleteStorageCard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StorageActions.deleteStorageCard),
      switchMap(({ hashCard }) => {
        return this._storage.deleteCard(hashCard).pipe(
          map(({code}) => {
            if(code === 403){
              return StorageActions.deleteStorageCardFailure({error:code, message:'ERRORS.ERROR_TO_DELETE_CARDS'})
            }

            return StorageActions.deleteStorageCardSuccess({ message:'COMMON.DELETE_CARD_SUCCESS' })
          }),
          catchError(error => {
            return of(StorageActions.deleteStorageCardFailure({error, message:'ERRORS.ERROR_TO_DELETE_CARDS'}))
          })
        )
      })
    );
  });

  messageSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        StorageActions.saveStorageCardSuccess,
        StorageActions.deleteStorageCardSuccess
      ),
      map(({message}) => NotificationActions.notificationSuccess({message}))
    )
  );

  messageFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        StorageActions.loadStorageCardsFailure,
        StorageActions.saveStorageCardFailure,
        StorageActions.deleteStorageCardFailure
      ),
      map(({message}) => NotificationActions.notificationFailure({message}))
    )
  );


  tryLoadStorage$ = createEffect(() => {
    return of(StorageActions.loadStorageCards())
  });



  constructor(
    private actions$: Actions,
    private _storage: StorageService,
  ) { }


}
