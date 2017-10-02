import { Subject } from 'rxjs/Rx';
import { ITestComponent, ITestResponse } from '../../../interfaces/IProcedureConfig.interface';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IQuestion } from '../../../interfaces/IQuestion.interface';
import { LanguageService } from '../../../services/language.service';
import { CognitionTestState } from '../../../enums/CognitionTest.State.enum';
import { CognitionApiService, ICognitionTestRespone } from '../../../services/cognition-api.service';
import { IQuestionnaire } from '../../../interfaces/IQuestionnaire.interface';
import { AudioService } from '../../../services/audio.service';

let State = CognitionTestState;

@Component({
  selector: 'snscg-cognition-test',
  templateUrl: './cognition-test.component.html',
  styleUrls: ['./cognition-test.component.scss']
})
export class CognitionTestComponent implements OnInit, OnDestroy, ITestComponent {

  @Output() disableContinueChanged = new EventEmitter<boolean>();

  showOwnContinueBtn = true;

  // ?Needed
  name = 'rolf';
  annotation = '';

  id: string;
  activeKey = '';
  activeWord = '';
  state = State.void;
  questionnaire: IQuestionnaire;
  countinueQuestionnaireDisabled = false;
  continueDisabled = true;

  continueQuestionnaireSubject: Subject<null> = new Subject();

  words: {
    present: string[],
    test: string[]
  };

  results: ICognitionTestRespone[] = [];

  constructor(public _languageService: LanguageService, private api: CognitionApiService, public audio: AudioService) { }

  ngOnInit() {
    this.init();

    window.addEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
  }

  async init() {
    let res = await this.api.initialize({ language: 'de', name: this.name });
    this.id = res.ID;
    this.questionnaire = res.Questionaire;
    this.state = State.presenting;
    this.checkContinueDisabled();
    this.words = {
      present: res.PresentWords,
      test: res.TestWords.concat(res.PresentWords)
    };
    setTimeout(() => { this.presentWords(); }, 2500);
  }

  disableContinueQuestionnaire(disable: boolean) {
    this.countinueQuestionnaireDisabled = disable;
    this.checkContinueDisabled();
  }

  checkContinueDisabled() {
    switch (this.state) {
      case State.presenting:
        this.disableContinue(true);
        break;
      case State.presentingQuestion:
        this.disableContinue(this.countinueQuestionnaireDisabled);
        break;
      case State.presentingFinal:
        this.disableContinue(true);
        break;
      case State.finishing:
        this.disableContinue(false);
        break
    }
  }

  disableContinue(disabled: boolean) {
    this.continueDisabled = disabled;
    this.disableContinueChanged.emit(disabled);
  }

  subscribeContinueDisabled(cb: (isDisabled: boolean) => void): void {
    this.disableContinueChanged.subscribe(cb);
    this.showOwnContinueBtn = false;
  }

  continue = async (): Promise<ITestResponse> => {
    switch (this.state) {
      case State.presentingQuestion:
        this.continueQuestionnaireSubject.next();
        break;
      case State.finishing:
        let res = await this.finish();
        console.log(res);
        return {
          isTestFinnished: true,
          result: {
            score: res,
            type: null
          }
        }
    }
    return {
      isTestFinnished: false
    };
  }

  async presentWords() {
    this.state = State.presenting;

    let rnd = Math.round(Math.random() * (this.words.present.length - 1));
    this.activeWord = this.words.present.splice(rnd, 1)[0];
    let res = await this.api.getWord({ id: this.id, word: this.activeWord });
    this.audio.play(res.sound);
    if (this.words.present.length == 0) {
      this.state = State.presentingQuestion;
      this.checkContinueDisabled();
    } else {
      setTimeout(() => { this.presentWords(); }, 200);
    }
  }

  questionnaireFinnished() {
    this.state = State.presentingFinal;
    this.checkContinueDisabled();
    this.presentNextTest();
  }

  presentNextTest() {
    let rnd = Math.round(Math.random() * (this.words.test.length - 1));
    this.activeWord = this.words.test.splice(rnd, 1)[0];
    if (this.words.test.length == 0) {
      this.state = State.finishing;
      this.checkContinueDisabled();
    }
  }

  resultForWord(seen: boolean) {
    this.results.push({
      Word: this.activeWord,
      Seen: seen
    });
    this.presentNextTest();
  }

  async finish() {
    return await this.api.finish({
      id: this.id,
      wordRes: this.results,
      annotation: this.annotation
    });
  }

  ngOnDestroy() {
    window.removeEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
    if (this.id && this.state <= State.finishing) {
      this.api.finish({ id: this.id, wordRes: null, annotation: 'test got destroyed' });
    }
    if (this.words) {
      this.words.present = [];
      setTimeout(() => { this.audio.stop(); }, 2000);
    }
  }

  keyDownEventListener = (e: KeyboardEvent) => {
    this.activeKey = e.key;
  }

  keyUpEventListener = (e: KeyboardEvent) => {
    this.activeKey = '';
  }

}
