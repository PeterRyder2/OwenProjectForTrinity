import { Injectable } from '@angular/core';
import { Language } from '../enums/languages.enum';
import { LanguageService } from './language.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SettingsService {

  private _language = Language.German;
  get language() { return this._language; };
  set language(value: Language) {
    // this._language = value;
    this._language = Language.English;
    this.languageChangedEvent.next(value);
    this.save();
  };

  private languageChangedEvent = new Subject<Language>();
  onLanguageChanged = this.languageChangedEvent.asObservable();

  constructor() {
    if (!this.load()) {
      this.initLanguage();
    }
  }

  initLanguage() {
    switch (navigator.language) {
      case 'en-GB':
        this.language = Language.English;
        break;
      case 'de':
        this.language = Language.German;
        break;

      default:
        break;
    }
  }

  private save() {
    let settings: ISettings = {
      language: this.language
    };

    localStorage.setItem('settings', JSON.stringify(settings));
  }

  private load() {
    let savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      let settings: ISettings = JSON.parse(savedSettings);
      // tslint:disable-next-line:forin
      for (let key in settings) {
        this[key] = settings[key];
      }
      return true;
    }
    return false;
  }

}

interface ISettings {
  language: number;
}
