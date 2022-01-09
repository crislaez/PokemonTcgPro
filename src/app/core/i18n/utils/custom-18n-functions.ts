import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../assets/i18n/', '.json');
}


export function appInitTranslations(translate: TranslateService, languages: string[], defaultLang: string): Promise<any> {

  const borwserLang = translate.getBrowserLang();
  const storeLang = localStorage.getItem('Language');
  //del localStorage o del navegador, o por defecto
  // const currentDefaultLnag = storeLang || (languages.includes(borwserLang) && borwserLang) || defaultLang
  const currentDefaultLnag = defaultLang;

  return new Promise<void>(resolve => {
    translate.addLangs(languages)
    localStorage.setItem('Language', currentDefaultLnag)
    translate.setDefaultLang(currentDefaultLnag);
    translate.use(currentDefaultLnag).subscribe(() => resolve());
  });
}
