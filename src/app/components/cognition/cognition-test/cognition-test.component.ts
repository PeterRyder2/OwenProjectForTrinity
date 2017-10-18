import { IdService } from '../../../services/id.service';
import { SettingsService } from '../../../services/settings.service';
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

  get language() {
    return this.languageService.components.cognition.test
  }

  constructor(public languageService: LanguageService, private api: CognitionApiService, public audio: AudioService, private settings: SettingsService, private idService: IdService) { }

  ngOnInit() {
    this.init();

    window.addEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
  }

  async init() {
    let res = await this.api.initialize({ language: this.settings.languageStr, name: this.idService.id });
    this.id = res.ID;
    this.questionnaire = res.Questionaire;
    this.checkContinueDisabled();
    this.words = {
      present: res.PresentWords,
      test: res.TestWords.concat(res.PresentWords)
    };
    setTimeout(() => {
      this.state = State.presenting;
      this.presentWords();
    }, 2500);
  }

  disableContinueQuestionnaire(disable: boolean) {
    this.countinueQuestionnaireDisabled = disable;
    this.checkContinueDisabled();
  }

  checkContinueDisabled() {
    switch (this.state) {
      case State.presentingQuestion:
        this.disableContinue(this.countinueQuestionnaireDisabled);
        break;
      case State.presenting:
      case State.presentingFinal:
        this.disableContinue(true);
        break;
      case State.finishing:
      case State.instructionsFinal:
      case State.instructionsQuestion:
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
      case State.instructionsQuestion:
        this.state = State.presentingQuestion;
        break;
      case State.presentingQuestion:
        this.continueQuestionnaireSubject.next();
        break;
      case State.instructionsFinal:
        this.state = State.presentingFinal;
        this.presentNextTest();
        this.checkContinueDisabled();
        break;
      case State.finishing:
        let res = await this.finish();
        console.log(res);
        return {
          result: res
        }
    }
    return false
  }

  async presentWords() {
    this.state = State.presenting;

    let rnd = Math.round(Math.random() * (this.words.present.length - 1));
    this.activeWord = this.words.present.splice(rnd, 1)[0];
    let res = await this.api.getWord({ id: this.id, word: this.activeWord });
    this.audio.play(res.sound);
    if (this.words.present.length == 0) {
      setTimeout(() => {
        this.state = State.instructionsQuestion;
        this.checkContinueDisabled();
      }, 2000);
    } else {
      setTimeout(() => { this.presentWords(); }, 2000);
    }
  }

  questionnaireFinnished() {
    this.state = State.instructionsFinal;
    this.checkContinueDisabled();
  }

  presentNextTest() {
    let rnd = Math.round(Math.random() * (this.words.test.length - 1));
    if (this.words.test.length == 0) {
      this.state = State.finishing;
      this.checkContinueDisabled();
    } else
      this.activeWord = this.words.test.splice(rnd, 1)[0];
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
      annotation: this.idService.annotation
    });
  }

  ngOnDestroy() {
    window.removeEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
    if (this.id && this.state < State.finishing) {
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
