import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { DigitTripleTestState } from '../../../enums/DigitTripleTestState.enum';

@Component({
  selector: 'snscg-digit-triple-test',
  templateUrl: './digit-triple-test.component.html',
  styleUrls: ['./digit-triple-test.component.scss']
})
export class DigitTripleTestComponent implements OnInit, OnDestroy {

  activeKey: string = '';

  state: DigitTripleTestState = DigitTripleTestState.void;
  enteredNumber: string = '';
  line = '|';
  blinkTimer;

  constructor(public _languageService: LanguageService) { }

  ngOnInit() {
    window.addEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
    this.blinkTimer = setInterval(() => {
      this.line = this.line == '|' || this.enteredNumber.length > 2 ? '' : '|';
    }, 500);
  }

  ngOnDestroy() {
    window.removeEventListener('keydown',
      this.keyDownEventListener)
    window.addEventListener('keyup',
      this.keyUpEventListener);
    clearInterval(this.blinkTimer);
  }

  start() {
    this.state = DigitTripleTestState.started;
  }

  cancel() {
    this.state = DigitTripleTestState.canceled;
    this.state = DigitTripleTestState.void;
  }

  keyDownEventListener = (e: KeyboardEvent) => {
    if (e.key.match('[0-9]')) {
      this.addNumber(e.key);
    } else if (e.key.match('Delete|Backspace'))
      this.removeLastNumber();
    this.activeKey = e.key;
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
