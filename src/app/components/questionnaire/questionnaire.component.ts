import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IQuestionnaire } from '../../intefaces/IQuestionnaire.interface';
import { IQuestion } from '../../intefaces/IQuestion.interface';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'snscg-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {

  @Input() questionnaire: IQuestionnaire = {
    id: '',
    title: '',
    forceResponse: true,
    backEnabled: true,
    questions: [
      {
        question: 'Have you noticed that you don’t hear as well as you used to?',
        type: false,
        answers: [
          {
            answer: 'Always',
            score: 0
          },
          {
            answer: 'Occasionally',
            score: 1
          },
          {
            answer: 'Never',
            score: 2,
          }
        ]
      }, {
        question: 'Has anybody told you that you don’t hear well?',
        type: false,
        answers: [
          {
            answer: 'Always',
            score: 0
          },
          {
            answer: 'Occasionally',
            score: 1
          },
          {
            answer: 'Never',
            score: 2
          }
        ]
      }, {
        question: 'Does your family tell you that you turn up the volume of the television or radio very loudly?',
        type: false,
        answers: [
          {
            answer: 'Always',
            score: 0
          },
          {
            answer: 'Occasionally',
            score: 1
          },
          {
            answer: 'Never',
            score: 2
          }
        ]
      }, {
        question: 'When you’re talking to someone, do you have to ask the person to speak louder?',
        type: false,
        answers: [
          {
            answer: 'Always',
            score: 0
          },
          {
            answer: 'Occasionally',
            score: 1
          },
          {
            answer: 'Never',
            score: 2
          }
        ]
      }, {
        question: 'When you’re talking to someone, do you have to ask the person to repeat what they’re saying various times?',
        type: false,
        answers: [
          {
            answer: 'Always',
            score: 0
          },
          {
            answer: 'Occasionally',
            score: 1
          },
          {
            answer: 'Never',
            score: 2
          }
        ]
      }, {
        question: 'Can you understand when someone is speaking to you in a low voice?',
        type: false,
        answers: [
          {
            answer: 'Always',
            score: 0
          },
          {
            answer: 'Occasionally',
            score: 1
          },
          {
            answer: 'Never',
            score: 2
          }
        ]
      }, {
        question: 'Can you understand when someone is speaking to you on the telephone?',
        type: false,
        answers: [
          {
            answer: 'Always',
            score: 0
          },
          {
            answer: 'Occasionally',
            score: 1
          },
          {
            answer: 'Never',
            score: 2
          }
        ]
      }, {
        question: 'Can you hear the sound of a coin dropping on the floor?',
        type: false,
        answers: [
          {
            answer: 'Always',
            score: 0
          },
          {
            answer: 'Occasionally',
            score: 1
          },
          {
            answer: 'Never',
            score: 2
          }
        ]
      }, {
        question: 'Can you hear the sound of a door closing?',
        type: false,
        answers: [
          {
            answer: 'Always',
            score: 0
          },
          {
            answer: 'Occasionally',
            score: 1
          },
          {
            answer: 'Never',
            score: 2
          }
        ]
      }, {
        question: 'Can you hear when someone approaches you from behind?',
        type: false,
        answers: [
          {
            answer: 'Always',
            score: 0
          },
          {
            answer: 'Occasionally',
            score: 1
          },
          {
            answer: 'Never',
            score: 2
          }
        ]
      }, {
        question: 'Can you hear when someone is speaking to you in a noisy setting such as a pub or restaurant?',
        type: false,
        answers: [
          {
            answer: 'Always',
            score: 0
          },
          {
            answer: 'Occasionally',
            score: 1
          },
          {
            answer: 'Never',
            score: 2
          }
        ]
      }, {
        question: 'Can you hold a conversation in a group setting when several people are speaking at the same time?',
        type: false,
        answers: [
          {
            answer: 'Always',
            score: 0
          },
          {
            answer: 'Occasionally',
            score: 1
          },
          {
            answer: 'Never',
            score: 2
          }
        ]
      }
    ]
  };

  @Output() finished = new EventEmitter();

  activeQuestion: IQuestion;
  activeQuestionIndex = 0;
  progress = 0;

  constructor(public _languageService: LanguageService) { }

  ngOnInit() {
    this.activeQuestion = this.questionnaire.questions[0];
  }

  prevQuestion() {
    let index = this.activeQuestionIndex <= 0 ? 0 : this.activeQuestionIndex - 1;
    this.selectQuestion(index);
  }

  nextQuestion() {
    if (this.activeQuestionIndex >= this.questionnaire.questions.length - 1) {
      this.finished.emit();
    } else {
      let index = this.activeQuestionIndex + 1;
      this.selectQuestion(index);
    }
  }

  selectQuestion(index: number) {
    this.activeQuestionIndex = index;
    this.activeQuestion = this.questionnaire.questions[this.activeQuestionIndex];
    this.progress = this.activeQuestionIndex / (this.questionnaire.questions.length - 1);
    console.log(this.progress);
  }

}
