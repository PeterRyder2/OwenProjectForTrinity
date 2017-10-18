import { ITestComponent, ITestResponse } from '../../interfaces/IProcedureConfig.interface';
import { Assert } from '../../lib/util';
import { Subject } from 'rxjs/Rx';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IQuestionnaire } from '../../interfaces/IQuestionnaire.interface';
import { IQuestion } from '../../interfaces/IQuestion.interface';
import { LanguageService } from '../../services/language.service';
import { QuestionType } from '../../enums/QuestionType.enum';
import { IAnswer } from '../../interfaces/IAnswer.inteface';

@Component({
  selector: 'snscg-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit, OnDestroy, ITestComponent {

  @Input() questionnaire: IQuestionnaire;
  @Input() continueSubject: Subject<null>;

  @Output() finished = new EventEmitter<IQuestionnaireResponse>();
  @Output() disableContinueChanged = new EventEmitter<boolean>();

  activeQuestion: IQuestion;
  activeQuestionIndex = 0;
  activeQuestionValid = false;
  continueDisabled = true;
  showOwnContinueButton = true;
  progress = 0;

  constructor(public _languageService: LanguageService) { }

  ngOnInit() {
    if (this.continueSubject !== null && this.continueSubject !== undefined) {
      this.showOwnContinueButton = false;
      this.continueSubject.subscribe(() => {
        this.continue();
      });
    }
    this.checkQuestionnaire();
    this.selectQuestion(0);
  }

  ngOnDestroy() {
    if (this.continueSubject !== null && this.continueSubject !== undefined)
      this.continueSubject.unsubscribe();
  }

  checkContinueDisabled(isValid) {
    this.activeQuestionValid = isValid;
    this.continueDisabled = !this.canContinue();
    this.disableContinueChanged.emit(this.continueDisabled);
  }

  canContinue() {
    return (this.questionnaire.forceResponse !== true && this.activeQuestion.type !== QuestionType.jump
      || this.activeQuestionValid === true);
  }

  subscribeContinueDisabled(cb: (isDisabled: boolean) => void) {
    this.disableContinueChanged.subscribe(cb);
    this.showOwnContinueButton = false;
  }

  continue = async (): Promise<ITestResponse> => {
    let finnished = false;
    if (this.canContinue()) {
      if (this.activeQuestionValid) {
        this.activeQuestion.answered = true;
        switch (this.activeQuestion.type) {
          case QuestionType.jump:
            if (this.activeQuestion.answers.find(val => val.selected == true).jumpTo < 0) {
              finnished = true;
            } else
              this.selectQuestion(this.activeQuestion.answers.find(val => val.selected == true).jumpTo)
            break;
          case QuestionType.single:
          case QuestionType.multiple:
            if (this.isLastQuestion()) {
              finnished = true;
            } else {
              let index = this.activeQuestionIndex + 1;
              this.selectQuestion(index);
            }
            break;
        }
      }
    }
    if (finnished) {
      let score = this.evaluateQuestionnaire();
      this.finished.emit(score);
      return {
        result: score
      }
    }
    return false
  }

  selectQuestion(index: number) {
    this.activeQuestionIndex = index;
    this.activeQuestion = this.questionnaire.questions[this.activeQuestionIndex];
    this.progress = this.activeQuestionIndex / (this.questionnaire.questions.length - 1);
  }

  isLastQuestion() {
    if (this.activeQuestion.type == QuestionType.jump)
      return false;
    else
      return this.activeQuestionIndex >= this.questionnaire.questions.length - 1 || this.activeQuestion.jumpTo <= -1
  }

  evaluateQuestionnaire(): IQuestionnaireResponse {
    let score = 0;
    let answeredQuestions = 0;
    for (let question of this.questionnaire.questions) {
      if (question.answered === true) {
        let questionScore;
        switch (question.type) {

          case QuestionType.jump:
          case QuestionType.single:
            for (let answer of question.answers) {
              if (answer.selected === true) {
                if (questionScore !== undefined)
                  throw new Error(`The question "${question.question}" is from type single but multiple answers were given.`)
                questionScore = answer.value;
              }
            }
            break;

          case QuestionType.multiple:
            for (let answer of question.answers) {
              if (answer.selected === true)
                questionScore = answer.value;
            }
            break;

          default:
            throw new Error(`The question "${(question as any).question}" has an invalid question type.`)
        }
        if (questionScore === undefined)
          throw new Error(`The question "${question.question}" was marked as answered but has no answer selected.`)
        else if (questionScore !== null) {
          answeredQuestions++;
          score += questionScore
        }
      }
    }
    return {
      score: score,
      answeredQuestions: answeredQuestions
    };
  }

  checkQuestionnaire() {
    let questionnaire = this.questionnaire;
    Assert.noObject(questionnaire, `the questionnaire should be an object`);
    Assert.noString(questionnaire.id, 'questionnaire.id');
    Assert.noString(questionnaire.title, `questionnaire.title of the questionnaire "${questionnaire.id}"`);
    if (questionnaire.forceResponse === undefined)
      questionnaire.forceResponse = true;
    Assert.noBoolean(questionnaire.forceResponse, `questionnaire.forceResponse of the questionnaire "${questionnaire.id}"`);
    Assert.noArray(questionnaire.questions, ` questionnaire.questions of the questionnaire "${questionnaire.id}"`);
    let maxTemplateNr = -1;
    if (questionnaire.answerTemplates !== undefined) {
      Assert.noArray(questionnaire.answerTemplates, `questionnaire.answerTemplates of the questionnaire "${questionnaire.id}"`);
      for (let i = 0; i < questionnaire.answerTemplates.length; i++) {
        Assert.noArray(questionnaire.answerTemplates[i], `questionnaire.answersTemplate[${i}] of the questionnaire "${questionnaire.id}"`);
        for (let j = 0; j < questionnaire.answerTemplates[i].length; j++) {
          Assert.noString(questionnaire.answerTemplates[i][j].answer, `questionnaire.answersTemplate[${i}][${j}].answer of the questionnaire "${questionnaire.id}"`);
          if (questionnaire.answerTemplates[i][j].value !== null)
            Assert.noNumber(questionnaire.answerTemplates[i][j].value, `questionnaire.answersTemplate[${i}][${j}].value of the questionnaire "${questionnaire.id}"`);
        }
      }
      maxTemplateNr = questionnaire.answerTemplates.length - 1;
    }
    for (let i = 0; i < questionnaire.questions.length; i++) {
      let question = questionnaire.questions[i];
      Assert.noObject(question, `questionnaire.questions[${i}] of the questionnaire "${questionnaire.id}"`);
      Assert.noString(question.question, `questionnaire.questions[${i}].question of the questionnaire "${questionnaire.id}"`);
      Assert.noNumber(question.type, `questionnaire.questions[${i}].type of the questionnaire "${questionnaire.id}"`);
      if (question.type > QuestionType.jump)
        throw new Error(`InvalidTypeError: questionnaire.questions[${i}].type of the questionnaire "${questionnaire.id}" has a wrong question type`)
      switch (question.type) {
        case QuestionType.jump:
          Assert.noArray(question.answers, `questionnaire.questions[${i}].answers of the questionnaire "${questionnaire.id}"`);
          for (let j = 0; j < question.answers.length; j++) {
            Assert.noString(question.answers[j].answer, `questionnaire.questions[${i}].answers[${j}].answer of the questionnaire "${questionnaire.id}"`);
            if (question.answers[j].value !== null)
              Assert.noNumber(question.answers[j].value, `questionnaire.questions[${i}].answers[${j}].value of the questionnaire "${questionnaire.id}"`);
            Assert.noNumber(question.answers[j].jumpTo, `questionnaire.questions[${i}].answers[${j}].jumpTo of the questionnaire "${questionnaire.id}"`);
          }
          break;
        case QuestionType.single:
        case QuestionType.multiple:
          if (question.jumpTo !== undefined)
            Assert.noNumber(question.jumpTo, `questionnaire.questions[${i}].jumpTo of the questionnaire "${questionnaire.id}"`);
          if (question.answerTemplateNr !== undefined) {
            Assert.noNumber(question.answerTemplateNr, `questionnaire.questions[${i}].answersTemplateNr of the questionnaire "${questionnaire.id}"`);
            if (question.answerTemplateNr > maxTemplateNr)
              throw new Error(`OutOfRangeError: questionnaire.questions[${i}].answersTemplateNr of the questionnaire "${questionnaire.id}"`)
            question.answers = this.getAnswerTemplate(question.answerTemplateNr);
          } else {
            Assert.noArray(question.answers, `questionnaire.questions[${i}].answers of the questionnaire "${questionnaire.id}"`);
            for (let j = 0; j < question.answers.length; j++) {
              Assert.noString(question.answers[j].answer, `questionnaire.questions[${i}].answers[${j}].answer of the questionnaire "${questionnaire.id}"`);
              if (question.answers[j].value !== null)
                Assert.noNumber(question.answers[j].value, `questionnaire.questions[${i}].answers[${j}].value of the questionnaire "${questionnaire.id}"`);
            }
          }
          break;
      }
    }
  }

  getAnswerTemplate(nr: number) {
    let arr: IAnswer[] = [];
    let template = this.questionnaire.answerTemplates[nr];
    // needs to copy so it's not ref to the template of the questionnaire object
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

export interface IQuestionnaireResponse {
  score: number;
  answeredQuestions: number;
}
