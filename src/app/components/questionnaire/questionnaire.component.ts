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

  @Output() finished = new EventEmitter();

  activeQuestion: IQuestion;
  activeQuestionIndex = 0;
  progress = 0;

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
        console.log('ENDE')
        this.finished.emit();
      } else
        this.selectQuestion(this.activeQuestion.answers.find(val => val.selected == true).value)
    } else if (this.activeQuestionIndex >= this.questionnaire.questions.length - 1 || this.activeQuestion.jumpTo <= -1) {
      console.log('ENDE')
      this.finished.emit();
    } else {
      let index = this.activeQuestionIndex + 1;
      this.selectQuestion(index);
    }
  }

  selectQuestion(index: number) {
    this.activeQuestionIndex = index;
    if (this.questionnaire.questions[this.activeQuestionIndex].answerTemplateNr != null) {
      this.questionnaire.questions[this.activeQuestionIndex].answers = this.getTemplate(this.questionnaire.questions[this.activeQuestionIndex].answerTemplateNr);
    };
    this.activeQuestion = this.questionnaire.questions[this.activeQuestionIndex];
    this.progress = this.activeQuestionIndex / (this.questionnaire.questions.length - 1);
    console.log(this.progress);
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
