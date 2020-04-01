import { Injectable } from '@angular/core';
import { Tranlations } from './translations';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor() { }

  static translate(str: string, lang = 'en') {
    return Tranlations[str] ? Tranlations[str][lang] : str;
  }
}
