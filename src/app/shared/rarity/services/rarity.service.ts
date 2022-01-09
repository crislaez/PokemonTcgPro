import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@pokemonTcgApp/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RarityService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;
  apyKey: string = `${this._coreConfig.getApiKey()}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getAllRarities(): Observable<string[]> {
    return this.http.get<any>(`${this.baseURL}/rarities?key=${this.apyKey}`).pipe(
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
