import { Language } from '../../../enums/languages.enum';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { DigitTripleTestState } from '../../../enums/DigitTripleTestState.enum';
import { HearingApiService } from '../../../services/hearing-api.service';
import { AudioService } from '../../../services/audio.service';
import { SettingsService } from '../../../services/settings.service';
import { SenseCogPage } from '../../../../../e2e/app.po';

import State = DigitTripleTestState;

@Component({
  selector: 'snscg-digit-triple-test',
  templateUrl: './digit-triple-test.component.html',
  styleUrls: ['./digit-triple-test.component.scss']
})
export class DigitTripleTestComponent implements OnInit, OnDestroy {

  activeKey = '';

  state: State = State.void;
  playingSound = false;
  enteredNumber = '';

  id: string;
  progress = 0;

  name = '';
  annotation = '';

  result = 0;

  constructor(
    public _languageService: LanguageService,
    private api: HearingApiService,
    private audio: AudioService,
    private zone: NgZone,
    public _settings: SettingsService
  ) { }


  ngOnInit() {
    /** start of workaround to remove name prompt | need to be removed in final release*/
    this.state = 1;
    this.name = 'TestNameOfUser';
    this.init();
    /** end of workaround to remove name prompt | need to be removed in final release */

    window.addEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
  }

  ngOnDestroy() {
    window.removeEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
    if (this.id && this.state <= State.finishing) {
      this.api.finish({ id: this.id, annotation: 'test got destroyed' });
    }
    if (this.playingSound == true) {
      this.audio.stop();
    }
  }

  init() {
    this.state = State.started;
  }

  async start() {
    let languageStr: string;
    let languageNum = this._settings.language;
    switch (languageNum) {
      case Language.German:
        languageStr = 'de';
        break;
      case Language.English:
        languageStr = 'en';
        break;
      default:
        break;
    }

    let res = await this.api.initialize({
      language: languageStr,
      name: this.name
    });
    console.log(languageStr);
    this.id = res.Id;
    this.present(res.TripleBuffer);
    this.audio.onMainSourceEnded.subscribe(() => {
      this.zone.run(() => { this.state = State.input; });
    });
    this.playingSound = true;
  }

  async continue() {
    if (this.enteredNumber.length == 3) {
      this.state = State.validation;
      let selectedTriple = this.enteredNumber;
      this.enteredNumber = '';
      let res = await this.api.next({ id: this.id, selectedTriple: selectedTriple });
      this.progress = res.Progress;
      if (res.End)
        this.state = State.finishing;
      else
        this.present(res.TripleBuffer);
    }
  }

  cancel() {
    this.state = State.finishing;
  }

  async finish() {
    this.audio.stop();
    let res = await this.api.finish({ id: this.id, annotation: this.annotation });
    this.result = res.Snr;
    this.state = State.result;
  }

  reset() {
    this.state = State.void;
    this.enteredNumber = '';

    this.id = '';
  }

  present(data: ArrayBuffer | string) {
    this.state = State.presentation;
    setTimeout(() => { this.audio.play(data); }, 2000);
  }

  keyDownEventListener = (e: KeyboardEvent) => {
    if (this.state == State.input) {
      if (e.key.match('[0-9]')) {
        this.addNumber(e.key);
      } else if (e.key.match('Delete|Backspace'))
        this.removeLastNumber();
      else if (e.key.match('Enter'))
        this.continue();
      this.activeKey = e.key;
    }
  }

  keyUpEventListener = (e: KeyboardEvent) => {
    this.activeKey = '';
  }

  addNumber(value: string) {
    if (this.enteredNumber.length < 3)
      this.enteredNumber += value;
  }

  removeLastNumber() {
    this.enteredNumber = this.enteredNumber.substr(0, this.enteredNumber.length - 1);
  }

}
