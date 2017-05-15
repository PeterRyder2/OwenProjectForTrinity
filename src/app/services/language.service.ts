import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { LangaugeFile } from '../langauge-files/_language.interface';
import { Language } from '../enums/languages.enum';
import { german } from '../langauge-files/german';
import { english } from '../langauge-files/english';

@Injectable()
export class LanguageService extends LangaugeFile {

  constructor(private _settings: SettingsService) {
    super();
    _settings.onLanguageChanged.subscribe(value => { this.loadLanguage(); });
    this.loadLanguage();
  }

  loadLanguage() {
    switch (this._settings.language) {
      case Language.German:
        this.setLanguage(german)
        break;
      case Language.English:
        this.setLanguage(english)
        break;

      default:
        break;
    }
  }

  private setLanguage(file: LangaugeFile) {
    for (let key in file) {
      this[key] = file[key];
    }
  }

}
