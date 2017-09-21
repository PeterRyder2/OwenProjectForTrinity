import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IQuestionnaire } from '../../intefaces/IQuestionnaire.interface';
import { IQuestion } from '../../intefaces/IQuestion.interface';
import { LanguageService } from '../../services/language.service';
import { QuestionType } from '../../enums/QuestionType.enum';
import { IAnswer } from '../../intefaces/IAnswer.inteface';

@Component({
  selector: 'snscg-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {

  @Input() questionnaire: IQuestionnaire;

  @Output() finished = new EventEmitter<number>();

  activeQuestion: IQuestion;
  activeQuestionIndex = 0;
  progress = 0;

  score = 0;

  constructor(public _languageService: LanguageService) { }

  ngOnInit() {
    this.selectQuestion(0);
  }

  prevQuestion() {
    let index = this.activeQuestionIndex <= 0 ? 0 : this.activeQuestionIndex - 1;
    this.selectQuestion(index);
  }

  nextQuestion() {
    if (this.activeQuestion.type == QuestionType.jump) {
      if (this.activeQuestion.answers.find(val => val.selected == true).value < 0) {
        this.finished.emit(this.score);
      } else
        this.selectQuestion(this.activeQuestion.answers.find(val => val.selected == true).value)
    } else if (this.activeQuestionIndex >= this.questionnaire.questions.length - 1 || this.activeQuestion.jumpTo <= -1) {
      this.score += this.activeQuestion.answers.find(val => val.selected == true).value;
      this.finished.emit(this.score);
    } else {
      let index = this.activeQuestionIndex + 1;
      this.score += this.activeQuestion.answers.find(val => val.selected == true).value;
      this.selectQuestion(index);
    }
    console.log(this.score);
  }

  selectQuestion(index: number) {
    this.activeQuestionIndex = index;
    this.activeQuestion = this.questionnaire.questions[this.activeQuestionIndex];
    if (this.activeQuestion.type == QuestionType.multiple || this.activeQuestion.type == QuestionType.single)
      if (this.activeQuestion.answerTemplateNr != null) {
        this.activeQuestion.answers = this.getTemplate(this.activeQuestion.answerTemplateNr);
      };
    this.progress = this.activeQuestionIndex / (this.questionnaire.questions.length - 1);
  }

  getTemplate(nr: number) {
    let arr: IAnswer[] = [];
    let template = this.questionnaire.answerTemplates[nr];
    for (let answer of template) {
      arr.push({
        answer: answer.answer,
        value: answer.value,
        selected: answer.selected
      });
    }
    return arr;
  }

}
