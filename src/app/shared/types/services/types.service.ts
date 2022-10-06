import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@PokeTCGdex/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class TypesService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;
  apyKey: string = `${this._coreConfig.getApiKey()}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getAllTypes(): Observable<string[]> {
    return this.http.get<any>(`${this.baseURL}/types?key=${this.apyKey}`).pipe(
      map(response => {
        const { data = null } = response || {};
        return data || []
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getAllSubTypes(): Observable<string[]> {
    return this.http.get<any>(`${this.baseURL}/subtypes?key=${this.apyKey}`).pipe(
      map(response => {
        const { data = null } = response || {};
        return data || []
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getAllSuperTypes(): Observable<string[]> {
    return this.http.get<any>(`${this.baseURL}/supertypes?key=${this.apyKey}`).pipe(
      map(response => {
        const { data = null } = response || {};
        return data || []
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}
