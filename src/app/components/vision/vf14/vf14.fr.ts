import { QuestionType } from '../../../enums/QuestionType.enum';
import { IQuestionnaire } from '../../../interfaces/IQuestionnaire.interface';

export let VF14_fr: IQuestionnaire = {
  id: 'VF-14',
  title: 'Vision questionnaire',
  forceResponse: true,
  questions: [
    {
      // tslint:disable-next-line:max-line-length
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
      // tslint:disable-next-line:max-line-length
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
      type: QuestionType.jump,
      answers: [
        {
          answer: 'Yes',
          jumpTo: 13,
          value: null
        },
        {
          answer: 'No',
          jumpTo: 15,
          value: null
        }
      ]
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
      type: QuestionType.jump,
      answers: [
        {
          answer: 'Yes',
          jumpTo: 16,
          value: null
        },
        {
          answer: 'No',
          jumpTo: -1,
          value: null
        }
      ]
    },
    {
      question: 'When did you stop driving?',
      type: QuestionType.single,
      answers: [
        {
          answer: 'less than 6 months ago',
          value: null
        },
        {
          answer: '6-12 months ago',
          value: null
        },
        {
          answer: 'more than 12 months ago',
          value: null
        }
      ]
    },
    {
      question: 'Why did you stop driving?',
      type: QuestionType.single,
      answers: [
        {
          answer: 'vision',
          value: null
        },
        {
          answer: 'other illness',
          value: null
        },
        {
          answer: 'other reason',
          value: null
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
        answer: 'yes, and am unable to do the activity',
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
}
