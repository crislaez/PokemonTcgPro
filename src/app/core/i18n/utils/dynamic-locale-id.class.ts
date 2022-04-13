import { registerLocaleData } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, startWith } from 'rxjs/operators';

export class DynamicLocaleId extends String {
  private _localeLoaded;

  constructor(protected translate: TranslateService) {

    super('');
    const langs = [...this.translate.langs];
    this._localeLoaded = (this.translate.langs ||[]).reduce((acc, lang) => ({ ...acc, [lang]: false }), {});

    this.translate.onLangChange.pipe(
      map(({ lang }) => lang),
      startWith(this.translate.currentLang),
      filter(Boolean)
    ).subscribe(async (lang: string) => {
      if ((langs || []).includes(lang)) {
        langs.splice(langs.indexOf(lang), 1);
        const angularLocale = await this.loadLocale(lang);
        registerLocaleData(angularLocale.default);
      }
    });

  }

  private loadLocale(lang: string): Promise<any> {
    switch (lang) {
      case 'en':
        return import(`@angular/common/locales/en`);
      default:
        return Promise.reject('Locale not supported');
    }
  }

  isLocaleLoaded(lang: string): boolean {
    return this._localeLoaded[lang];
  }

  toString() {
    return this.translate.currentLang;
  }
}
