import { QuestionType } from '../enums/QuestionType.enum';
import { IQuestionnaire } from '../intefaces/IQuestionnaire.interface';

export let VF14: IQuestionnaire = {
  id: 'VF-14',
  title: 'Visual Function Index',
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
}

export let IQCODE: IQuestionnaire = {
  id: 'IQCODE',
  title: 'IQCODE',
  questions: [
    {
      question: 'Remembering things about family and friends e.g. occupations, birthdays, addresses',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Remembering things that have happened recently',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Recalling conversations a few days later',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Remembering his/her address and telephone number',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Remembering what day and month it is',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Remembering where things are usually kept',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Remembering where to find things which have been put in a different place from usual',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Knowing how to work familiar machines around the house',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Learning to use a new gadget or machine around the house',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Learning new things in general',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Following a story in a book or on TV',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Making decisions on everyday matters',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Handling money for shopping',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Handling financial matters e.g. the pension, dealing with the bank',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Handling other everyday arithmetic problems e.g. knowing how much food to buy, knowing how long between visits from family or friends',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Using his/her intelligence to understand what\'s going on and to reason things through',
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

export let HDDA: IQuestionnaire = {
  id: 'HDDA',
  title: 'HDDA',
  forceResponse: true,
  backEnabled: false,
  questions: [
    {
      question: 'Have you noticed that you don’t hear as well as you used to?',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Has anybody told you that you don’t hear well?',
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
      answerTemplateNr: 0
    }, {
      question: 'Can you understand when someone is speaking to you on the telephone?',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Can you hear the sound of a coin dropping on the floor?',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Can you hear the sound of a door closing?',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Can you hear when someone approaches you from behind?',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Can you hear when someone is speaking to you in a noisy setting such as a pub or restaurant?',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Can you hold a conversation in a group setting when several people are speaking at the same time?',
      type: QuestionType.single,
      answerTemplateNr: 0
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
        answer: 'Never',
        value: 2
      }
    ]
  ]
}
