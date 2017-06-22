import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IQuestion } from '../../../intefaces/IQuestion.interface';
import { LanguageService } from '../../../services/language.service';
import { CognitionTestState } from '../../../enums/CognitionTest.State.enum';
import { CognitionApiService, ICognitionTestRespone } from '../../../services/cognition-api.service';
import { IQuestionnaire } from '../../../intefaces/IQuestionnaire.interface';
import { AudioService } from '../../../services/audio.service';

let State = CognitionTestState;

@Component({
  selector: 'snscg-cognition-test',
  templateUrl: './cognition-test.component.html',
  styleUrls: ['./cognition-test.component.scss']
})
export class CognitionTestComponent implements OnInit, OnDestroy {

  id: string;
  name = '';
  activeKey = '';
  annotation = '';
  activeWord = '';
  result = '';
  state = State.void;
  questionnaire: IQuestionnaire;

  words: {
    present: string[],
    test: string[]
  };

  results: ICognitionTestRespone[] = [];

  constructor(public _languageService: LanguageService, private api: CognitionApiService, public audio: AudioService) { }

  ngOnInit() {
    window.addEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
  }

  async init() {
    let res = await this.api.initialize({ language: 'de', name: this.name });
    this.id = res.ID;
    this.questionnaire = res.Questionaire;
    this.words = {
      present: res.PresentWords,
      test: res.TestWords.concat(res.PresentWords)
    };
    this.presentWords();
  }

  async presentWords() {
    this.state = State.presenting;

    let rnd = Math.round(Math.random() * (this.words.present.length - 1));
    this.activeWord = this.words.present.splice(rnd, 1)[0];
    let res = await this.api.getWord({ id: this.id, word: this.activeWord });
    this.audio.play(res.sound);
    if (this.words.present.length == 0) {
      this.state = State.presentingQuestion;
    } else {
      setTimeout(() => { this.presentWords(); }, 10);
    }
  }

  questionnaireFinnished() {
    this.state = State.presentingFinal;
    this.presentNextTest();
  }

  presentNextTest() {
    let rnd = Math.round(Math.random() * (this.words.test.length - 1));
    this.activeWord = this.words.test.splice(rnd, 1)[0];
    if (this.words.test.length == 0) {
      this.state = State.finishing;
    }
  }

  resultForWord(seen: boolean) {
    this.results.push({
      Word: this.activeWord,
      Seen: seen
    });
    this.presentNextTest();
  }

  finish() {
    this.api.finish({
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
    if (this.id && this.state <= State.ended) {
      this.api.finish({ id: this.id, wordRes: null, annotation: 'test got destroyed' });
    }
  }

  keyDownEventListener = (e: KeyboardEvent) => {
    this.activeKey = e.key;
  }

  keyUpEventListener = (e: KeyboardEvent) => {
    this.activeKey = '';
  }

}
