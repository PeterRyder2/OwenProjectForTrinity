import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { ILanguageFile } from '../interfaces/ILanguage.interface';
import { Language } from '../enums/languages.enum';
import { german } from '../language-files/german';
import { english } from '../language-files/english';
import { french } from '../language-files/french';
import { greek } from '../language-files/greek';

@Injectable()
export class LanguageService extends ILanguageFile {

  constructor(private _settings: SettingsService) {
    super();
    _settings.onLanguageChanged.subscribe(value => { this.loadLanguage(); });
    this.loadLanguage();
  }

  loadLanguage() {
    switch (this._settings.language) {
      case Language.English:
        this.setLanguage(JSON.parse(JSON.stringify(english)));
        break;
      case Language.Greek:
        this.setLanguage(JSON.parse(JSON.stringify(greek)));
        break;
      case Language.French:
        this.setLanguage(JSON.parse(JSON.stringify(french)));
        break;

      default:
        break;
    }
  }

  private setLanguage(file: ILanguageFile) {
    // tslint:disable-next-line:forin
    for (let key in file) {
      this[key] = file[key];
    }
  }

}
