import { QuestionType } from '../../../enums/QuestionType.enum';
import { IQuestionnaire } from '../../../interfaces/IQuestionnaire.interface';

export let IQCODE: IQuestionnaire = {
  id: 'IQCODE',
  title: 'IQCODE',
  questions: [
    {
      question: 'Compared with ten years ago how is this person at: Remembering things about family and friends e.g. occupations, birthdays, addresses',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Compared with ten years ago how is this person at: Remembering things that have happened recently',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Compared with ten years ago how is this person at: Recalling conversations a few days later',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Compared with ten years ago how is this person at: Remembering his/her address and telephone number',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Compared with ten years ago how is this person at: Remembering what day and month it is',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Compared with ten years ago how is this person at: Remembering where things are usually kept',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Compared with ten years ago how is this person at: Remembering where to find things which have been put in a different place from usual',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Compared with ten years ago how is this person at: Knowing how to work familiar machines around the house',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Compared with ten years ago how is this person at: Learning to use a new gadget or machine around the house',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Compared with ten years ago how is this person at: Learning new things in general',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Compared with ten years ago how is this person at: Following a story in a book or on TV',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Compared with ten years ago how is this person at: Making decisions on everyday matters',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Compared with ten years ago how is this person at: Handling money for shopping',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Compared with ten years ago how is this person at: Handling financial matters e.g. the pension, dealing with the bank',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Compared with ten years ago how is this person at: Handling other everyday arithmetic problems e.g. knowing how much food to buy, knowing how long between visits from family or friends',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Compared with ten years ago how is this person at: Using his/her intelligence to understand what\'s going on and to reason things through',
      type: QuestionType.single,
      answerTemplateNr: 0
    }
  ],
  answerTemplates: [
    [
      {
        answer: 'Much improved',
        value: 1
      },
      {
        answer: 'A  bit  improved',
        value: 2
      },
      {
        answer: 'Not much change',
        value: 3
      },
      {
        answer: 'A bit  worse',
        value: 4
      },
      {
        answer: 'Much worse',
        value: 5
      }
    ]
  ]
}
