import { IdService } from '../../../services/id.service';
import { ITestComponent, ITestResponse, ITestResult } from '../../../interfaces/IProcedureConfig.interface';
import { Language } from '../../../enums/languages.enum';
import { Component, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { DigitTripleTestState } from '../../../enums/DigitTripleTestState.enum';
import { HearingApiService } from '../../../services/hearing-api.service';
import { AudioService } from '../../../services/audio.service';
import { SettingsService } from '../../../services/settings.service';

import State = DigitTripleTestState;

@Component({
  selector: 'snscg-digit-triple-test',
  templateUrl: './digit-triple-test.component.html',
  styleUrls: ['./digit-triple-test.component.scss']
})
export class DigitTripleTestComponent implements OnInit, OnDestroy, ITestComponent {

  @Output() disableContinueChanged = new EventEmitter<boolean>(true);

  activeKey = '';

  state: State = State.void;
  enteredNumber = '';
  showOwnContinueBtn = true;

  testId: string;
  progress = 0;

  result = 0;

  get canContinue() {
    if (this.enteredNumber.length !== 3 && this.state == State.input || this.state == State.started
      || this.state == State.validation || this.state == State.presentation) return false;
    return true;
  }

  get language() {
    return this.languageService.components.hearing.test;
  }

  constructor(
    private api: HearingApiService,
    private audio: AudioService,
    private zone: NgZone,
    private idService: IdService,
    private settings: SettingsService,
    public languageService: LanguageService
  ) { }


  ngOnInit() {
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
    if (this.testId && this.state < State.finishing) {
      this.api.finish({ id: this.testId, annotation: 'test got destroyed', sendMail: this.settings.sendEmail });
    }
    if (this.audio.isPlaying == true) {
      this.audio.stop();
    }
    this.state = State.cancelled;
  }

  subscribeContinueDisabled(cb: (isDisabled: boolean) => void): void {
    this.disableContinueChanged.subscribe(cb);
    this.showOwnContinueBtn = false;
  }

  continue = async (): Promise<ITestResponse> => {
    switch (this.state) {
      case State.void:
        this.start();
        this.state = State.started;
        this.disableContinueChanged.emit(!this.canContinue);
        break;

      case State.input:
        let res1 = await this.nextTriple();
        this.disableContinueChanged.emit(!this.canContinue);
        console.log(res1);
        return res1;

      case State.finishing:
        let res = await this.finish();
        this.disableContinueChanged.emit(!this.canContinue);
        return res

      default:
        break;
    }
    return false;
  }

  async start() {
    console.log(this.settings.languageStr)
    let res = await this.api.initialize({
      language: this.settings.languageStr,
      name: this.idService.id
    });
    this.testId = res.Id;
    this.present(res.TripleBuffer);
    this.audio.onMainSourceEnded.subscribe(() => {
      if (this.state !== State.cancelled)
        this.zone.run(() => {
          this.state = State.input;
          this.disableContinueChanged.emit(!this.canContinue);
        });
    });
  }

  async nextTriple() {
    if (this.enteredNumber.length == 3) {
      this.state = State.validation;
      let selectedTriple = this.enteredNumber;
      this.enteredNumber = '';
      this.disableContinueChanged.emit(!this.canContinue);
      let res = await this.api.next({ id: this.testId, selectedTriple: selectedTriple });
      this.progress = res.Progress;
      if (res.End === true) {
        this.state = State.finishing;
        return await this.finish();
      } else {
        this.present(res.TripleBuffer);
        return false;
      }
    }
  }

  // TODO ist die Annotation noch gewünscht?
  async finish(): Promise<ITestResult<number>> {
    this.audio.stop();
    let res = await this.api.finish({ id: this.testId, annotation: this.idService.annotation, sendMail: this.settings.sendEmail });
    console.log(res.Snr)
    return {
      result: res.Snr
    };
  }

  present(data: ArrayBuffer | string) {
    this.state = State.presentation;
    this.disableContinueChanged.emit(!this.canContinue);
    this.audio.play(data);
  }

  keyDownEventListener = (e: KeyboardEvent) => {
    if (this.state == State.input) {
      if (e.key.match('[0-9]')) {
        this.addNumber(e.key);
      } else if (e.key.match('Delete|Backspace'))
        this.removeLastNumber();
      else if (e.key.match('Enter') && this.showOwnContinueBtn)
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
    this.disableContinueChanged.emit(!this.canContinue);
  }

  removeLastNumber() {
    this.enteredNumber = this.enteredNumber.substr(0, this.enteredNumber.length - 1);
  }

}
