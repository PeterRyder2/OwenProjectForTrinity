import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { DigitTripleTestState } from '../../../enums/DigitTripleTestState.enum';
import { DttApiService } from '../../../services/dtt-api.service';
import { AudioService } from '../../../services/audio.service';

import State = DigitTripleTestState;

@Component({
  selector: 'snscg-digit-triple-test',
  templateUrl: './digit-triple-test.component.html',
  styleUrls: ['./digit-triple-test.component.scss']
})
export class DigitTripleTestComponent implements OnInit, OnDestroy {

  activeKey = '';

  state: State = State.void;
  enteredNumber = '';

  id: string;
  progress = 0;

  name = '';
  annotation = '';

  result = 0;

  constructor(public _languageService: LanguageService, private api: DttApiService, private audio: AudioService, private zone: NgZone) { }

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
    if (this.id && this.state <= State.finishing) {
      this.api.finish({ id: this.id, annotation: 'test got destroyed' });
    }
    if (this.state) {
      this.audio.stop();
    }
  }

  init() {
    this.state = State.started;
  }

  async start() {
    let res = await this.api.initialize({
      language: 'de',
      name: this.name
    });
    this.id = res.Id;
    this.present(res.TripleBuffer);
    this.audio.onMainSourceEnded.subscribe(() => {
      this.zone.run(() => { this.state = State.input; });
    });
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
    this.audio.play(data);
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
