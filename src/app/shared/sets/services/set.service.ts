import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@PokeTCGdex/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Set } from '../models';


@Injectable({
  providedIn: 'root'
})
export class SetService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;
  apyKey: string = `${this._coreConfig.getApiKey()}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getAllSets(): Observable<Set[]> {
    return this.http.get<any>(`${this.baseURL}/sets?orderBy=releaseDate?key=${this.apyKey}`).pipe(
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
