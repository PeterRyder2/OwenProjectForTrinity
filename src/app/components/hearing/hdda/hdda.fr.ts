import { QuestionType } from '../../../enums/QuestionType.enum';
import { IQuestionnaire } from '../../../interfaces/IQuestionnaire.interface';

export let HDDA_fr: IQuestionnaire = {
  id: 'HDDA',
  title: 'Hearing questionnaire',
  forceResponse: true,
  backEnabled: false,
  questions: [
    {
      question: 'FR Have you noticed that you don’t hear as well as you used to?',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'FR Has anybody told you that you don’t hear well?',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Does your family tell you that you turn up the volume of the television or radio very loudly?',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'When you’re talking to someone, do you have to ask the person to speak louder?',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'When you’re talking to someone, do you have to ask the person to repeat what they’re saying various times?',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Can you understand when someone is speaking to you in a low voice?',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Can you understand when someone is speaking to you on the telephone?',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Can you hear the sound of a coin dropping on the floor?',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Can you hear the sound of a door closing?',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Can you hear when someone approaches you from behind?',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Can you hear when someone is speaking to you in a noisy setting such as a pub or restaurant?',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Can you hold a conversation in a group setting when several people are speaking at the same time?',
      type: QuestionType.single,
      answerTemplateNr: 1
    }
  ],
  answerTemplates: [
    [
      {
        answer: 'Always',
        value: 0
      },
      {
        answer: 'Occasionally',
        value: 1
      },
      {
        answer: 'Neverou',
        value: 2
      }
    ],
    [
      {
        answer: 'No, I can\'t',
        value: 0
      },
      {
        answer: 'With some difficulty',
        value: 1
      },
      {
        answer: 'Yes, without difficulty',
        value: 2
      }
    ]
  ]
}
