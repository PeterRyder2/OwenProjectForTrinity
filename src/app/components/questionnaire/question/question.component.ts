import { Component, OnInit, Input } from '@angular/core';
import { IQuestion } from '../../../intefaces/IQuestion.interface';

@Component({
  selector: 'snscg-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() progress = 0;
  @Input() question: QuestionExt;

  constructor() { }

  ngOnInit() {
    if (!this.question)
      throw new Error('You need to pass a Question');
  }

  onSelection(index: number, checked: boolean) {
    for (var i = 0; i < this.question.answers.length; i++) {
      if (i == index)
        this.question.answers[i].selected = checked;
      else if (!this.question.type)
        this.question.answers[i].selected = false;
    }
    if (this.question.answers.find((value) => { if (value.selected) return true }))
      this.question.answered = true;
    else
      this.question.answered = false;
  }

}

interface QuestionExt extends IQuestion {
  answers: [
    {
      answer: string;
      score: number;
      selected: boolean;
    }
  ]
}
