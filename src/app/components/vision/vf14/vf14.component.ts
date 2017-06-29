import { Component, OnInit } from '@angular/core';
import { IQuestionnaire } from '../../../intefaces/IQuestionnaire.interface';
import { QuestionType } from '../../../enums/QuestionType.enum';

@Component({
  selector: 'snscg-vf14',
  templateUrl: './vf14.component.html',
  styleUrls: ['./vf14.component.scss']
})
export class VF14Component implements OnInit {

  questionnaire: IQuestionnaire = {
    id: 'VF-14',
    title: 'Visual Function Index',
    forceResponse: false,
    questions: [
      {
        question: 'Do you have any difficulty, even with glasses, reading small print, such as labels on medicine bottles, a telephone book, food labels?',
        answerTemplateNr: 0,
        type: QuestionType.single
      },
      {
        question: 'Do you have any difficulty, even with glasses, reading a newspaper or a book?',
        answerTemplateNr: 0,
        type: QuestionType.single
      },
      {
        question: 'Do you have any difficulty, even with glasses, reading a large-print book or large-print newspaper or numbers on a telephone?',
        answerTemplateNr: 0,
        type: QuestionType.single
      },
      {
        question: 'Do you have any difficulty, even with glasses, recognizing people when they are close to you?',
        answerTemplateNr: 0,
        type: QuestionType.single
      },
      {
        question: 'Do you have any difficulty, even with glasses, seeing steps, stairs or curbs?',
        answerTemplateNr: 0,
        type: QuestionType.single
      },
      {
        question: 'Do you have any difficulty, even with glasses, reading traffic signs, street signs, or store signs?',
        answerTemplateNr: 0,
        type: QuestionType.single
      },
      {
        question: 'Do you have any difficulty, even with glasses, doing find handwork like sewing, knitting, crocheting, carpentry?',
        answerTemplateNr: 0,
        type: QuestionType.single
      },
      {
        question: 'Do you have any difficulty, even with glasses, writing checks or filling out forms?',
        answerTemplateNr: 0,
        type: QuestionType.single
      },
      {
        question: 'Do you have any difficulty, even with glasses, playing games such as bingo, dominos, card games, mahjong?',
        answerTemplateNr: 0,
        type: QuestionType.single
      },
      {
        question: 'Do you have any difficulty, even with glasses, taking part in sports like bowling, handball, tennis, golf?',
        answerTemplateNr: 0,
        type: QuestionType.single
      },
      {
        question: 'Do you have any difficulty, even with glasses, cooking?',
        answerTemplateNr: 0,
        type: QuestionType.single
      },
      {
        question: 'Do you have any difficulty, even with glasses, watching television?',
        answerTemplateNr: 0,
        type: QuestionType.single
      },
      {
        question: 'Do you currently drive a car?',
        answers: [
          {
            answer: 'Yes',
            value: 13
          },
          {
            answer: 'No',
            value: 15
          }
        ],
        type: QuestionType.jump
      },
      {
        question: 'How much difficulty do you have driving during the day because of your vision?',
        answerTemplateNr: 1,
        type: QuestionType.single
      },
      {
        question: 'How much difficulty do you have driving at night because of your vision?',
        answerTemplateNr: 1,
        type: QuestionType.single,
        jumpTo: -1
      },
      {
        question: 'Have you ever driven a car?',
        answers: [
          {
            answer: 'Yes',
            value: 16
          },
          {
            answer: 'No',
            value: -1
          }
        ],
        type: QuestionType.jump
      },
      {
        question: 'When did you stop driving?',
        type: QuestionType.single,
        answers: [
          {
            answer: 'less than 6 months ago',
            value: 0
          },
          {
            answer: '6-12 months ago',
            value: 0
          },
          {
            answer: 'more than 12 months ago',
            value: 0
          }
        ]
      },
      {
        question: 'Why did you stop driving?',
        type: QuestionType.single,
        answers: [
          {
            answer: 'vision',
            value: 0
          },
          {
            answer: 'other illness',
            value: 0
          },
          {
            answer: 'other reason',
            value: 0
          }
        ]
      }
    ],
    answerTemplates: [
      [
        {
          answer: 'not applicable',
          value: null
        },
        {
          answer: 'no',
          value: 4
        },
        {
          answer: 'yes, with a little difficulty',
          value: 3
        },
        {
          answer: 'yes, with a moderate amount of difficulty',
          value: 2
        },
        {
          answer: 'yes, with a great deal of difficulty',
          value: 1
        },
        {
          answer: 'yes, and am unable to do the activty',
          value: 0
        }
      ],
      [
        {
          answer: 'no difficulty',
          value: 4
        },
        {
          answer: 'a little difficulty',
          value: 3
        },
        {
          answer: 'a moderate amount of difficulty',
          value: 2
        },
        {
          answer: 'a great deal of difficulty',
          value: 1
        }
      ]
    ]
  };

  constructor() { }

  ngOnInit() {
  }



}
