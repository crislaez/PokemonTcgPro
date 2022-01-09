import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable, of, timer } from 'rxjs';
import { expand, first, map, mapTo, tap } from 'rxjs/operators';
import { DynamicLocaleId } from '../utils/dynamic-locale-id.class';

@Injectable({
  providedIn: 'root'
})
export class LangGuard implements CanActivate, CanLoad {
  constructor(private translate: TranslateService, @Inject(LOCALE_ID) private localeId: DynamicLocaleId) { }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const lang =  JSON.parse(localStorage.getItem('__app_storage_settings__'))?.languages?.selectedLang || next?.data?.lang || this.translate.defaultLang;
    if (lang !== this.translate.currentLang) {
      return this.translate.use(lang).pipe(
        mapTo(true)
      );
    }
    return true;
  }

  canLoad(): Observable<boolean> | boolean {
    return of(this.localeId.isLocaleLoaded(this.translate.currentLang)).pipe(
      expand((localeLoaded) => {
        if (!localeLoaded) {
          return timer().pipe(map(()=> this.localeId.isLocaleLoaded(this.translate.currentLang)));
        }
        return EMPTY;
      }),
      first<boolean>(Boolean),
    )
  }

}
