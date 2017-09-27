import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IQuestion } from '../../../intefaces/IQuestion.interface';
import { QuestionType } from '../../../enums/QuestionType.enum';
import { IAnswer } from '../../../intefaces/IAnswer.inteface';

@Component({
  selector: 'snscg-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnChanges {

  @Input() progress = 0;
  @Input() question: IQuestion;
  @Output() newSelection = new EventEmitter<boolean>(true);

  constructor() { }

  ngOnInit() {
    if (!this.question)
      console.log('You need to pass a Question');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question && this.question) {
      this.newSelection.emit(this.isAnswerValid());
    }
  }

  onSelection(index: number, checked: boolean) {
    let valid = false;
    if (this.question.type == QuestionType.single || this.question.type == QuestionType.jump)
      for (let answer of this.question.answers) {
        answer.selected = false;
      }
    this.question.answers[index].selected = checked;
    this.newSelection.emit(this.isAnswerValid());
  }

  isAnswerValid() {
    let answersSelected = (this.question.answers as Array<IAnswer>).countOf(value => { if (value.selected == true) return true; });
    switch (this.question.type) {
      case QuestionType.single:
      case QuestionType.jump:
        if (answersSelected == 1)
          return true;
        break;
      case QuestionType.multiple:
        if (answersSelected >= 1)
          return true;
        break
    }
    return false;
  }

}
