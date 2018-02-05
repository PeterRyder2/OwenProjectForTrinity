import { Injectable } from '@angular/core';
import { Language } from '../enums/languages.enum';
import { LanguageService } from './language.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SettingsService {

  showedControlCenter = false;

  private _skipId = false;
  get skipId() { return this._skipId }
  set skipId(value: boolean) {
    this._skipId = value;
    this.save();
  }

  private _showActualResult = true;
  get showActualResult() { return this._showActualResult }
  set showActualResult(value: boolean) {
    this._showActualResult = value;
    this.save();
  }

  private _sendEmail = true;
  get sendEmail() { return this._sendEmail }
  set sendEmail(value: boolean) {
    this._sendEmail = value;
    this.save();
  }

  private _language = Language.English;
  get language() { return this._language; };
  set language(value: Language) {
    this._language = value;
    this.languageChangedEvent.next(value);
    this.save();
  };

  get languageStr() {
    switch (this.language) {
      case Language.English:
        return 'en';
      case Language.French:
        return 'fr';
      case Language.Greek:
        return 'gr';
      default:
        break;
    }
  }

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

      default:
        this.language = Language.English;
        break;
    }
  }

  private save() {
    let settings: ISettings = {
      language: this.language,
      skipId: this.skipId,
      showActualResult: this.showActualResult,
      sendEmail: this.sendEmail,
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
  skipId: boolean;
  showActualResult: boolean;
  sendEmail: boolean;
}
