import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../../../intefaces/IQuestion.interface';

@Component({
  selector: 'snscg-cognition-test',
  templateUrl: './cognition-test.component.html',
  styleUrls: ['./cognition-test.component.scss']
})
export class CognitionTestComponent implements OnInit {

  question: IQuestion = {
    question: 'was hat marc gegessen',
    type: true,
    answers: [
      {
        answer: 'Curry'
      },
      {
        answer: 'Huhn'
      },
      {
        answer: 'Sushi'
      },
      {
        answer: 'Eisenbahn'
      }
    ]
  }

  constructor() { }

  ngOnInit() {
  }

}
