import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@PokeTCGdex/core/services/core-config.service';
import { Filter } from '@PokeTCGdex/shared/models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Card } from '../models';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;
  apyKey: string = `${this._coreConfig.getApiKey()}`;
  perPage: string = `${this._coreConfig.getPerPage()}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getAllCards(page: number = 0, filter: Filter): Observable<{cards: Card[], totalCount: number}> {
    const { setName = null, name = null, types = null, supertypes = null, subtypes = null } = filter || {};

    let params = new HttpParams();
    let q = '';
    if (setName) q += `set.id:${setName}`
    if(name) q += ` name:${name}`;
    if(types) q +=` types:${types}`;
    if(supertypes) q +=` supertype:${supertypes}`;
    if(subtypes) q +=` subtypes:${subtypes}`;

    if(q){
      params = params.append('q', q);
    }


    return this.http.get<any>(`${this.baseURL}/cards?key=${this.apyKey}&page=${page}&pageSize=${this.perPage}`, { params } ).pipe(
      map(response => {
        const { data = null, totalCount = 0 } = response || {};
        return {cards: data || [], totalCount }
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}
