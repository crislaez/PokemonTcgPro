import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@pokemonTcgApp/core/services/core-config.service';
import { Filter } from '@pokemonTcgApp/shared/utils/models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;
  apyKey: string = `${this._coreConfig.getApiKey()}`;
  perPage: string = `${this._coreConfig.getPerPage()}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getAllCards(page: number = 0, filter: Filter): Observable<any> {
    // console.log('SERVICES', page, filter)
    const { setName = null, name = null, types = null} = filter || {};
    let params = new HttpParams();
    let q = '';
    if (setName) q += `set.id:${setName}`
    if(name) q += ` name:${name}`;
    if(types) q +=` types:${types}`;

    params = params.append('q', q);

    return this.http.get<any>(`${this.baseURL}/cards?key=${this.apyKey}&page=${page}&pageSize=${this.perPage}`, { params } ).pipe(
      map(response => {
        const { data = null, page = null, pageSize = null, totalCount = null, count = null  } = response || {};
        return {cards: data || [], page, pageSize, totalCount: Math.ceil(totalCount / Number(this.perPage)), count }
      }),
      // map(() => {
      //   return {cards: []}
      //   throw 504
      // }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}
