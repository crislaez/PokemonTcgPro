import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
// import { AuthActions, AuthService } from '@kirolapp/web-modules/auth';

export class HttpErrorInterceptor implements HttpInterceptor {

  constructor( private store: Store) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          console.log(error)
          // if (error.error instanceof ErrorEvent) {
          //   errorMessage = `Error: ${error.error.message}`;
          // }
          // else{
          //   //TODO  error.status me llega 0
          //   // console.log(error.status)
          //   // console.log(error)

          //   if(error.status === 403){
          //     // this.store.dispatch(AuthActions.forceLogout());
          //   }

          //   if(error.status === 401 ) {
          //     return this._auth.refresh().pipe(
          //       catchError((err) => {
          //         console.error(err);
          //         // this.store.dispatch(AuthActions.forceLogout());
          //         return EMPTY;
          //       }),
          //       switchMap(() => next.handle(request)),
          //     );
          //   }
          //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.error?.message || error.message}`;

          // }
          return throwError(error.error);
        })
      )
  }
}
