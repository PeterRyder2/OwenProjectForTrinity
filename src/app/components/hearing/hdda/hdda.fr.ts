import { QuestionType } from '../../../enums/QuestionType.enum';
import { IQuestionnaire } from '../../../interfaces/IQuestionnaire.interface';

export let HDDA_fr: IQuestionnaire = {
  id: 'HDDA',
  title: 'Questionnaire d’audition',
  forceResponse: true,
  backEnabled: false,
  questions: [
    {
      question: 'Avez-vous remarqué que vous n’entendiez plus aussi bien qu’avant ?',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Quelqu’un vous a-t-il dit que vous n’entendiez pas bien ?',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Vos proches vous disent-ils que vous réglez le volume de la radio ou de la télé très fort ?',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Lorsque vous parlez avec quelqu’un, avez-vous besoin de lui demander de parler plus fort ?',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Lorsque vous parlez avec quelqu’un, avez-vous besoin de lui demander de répéter ce qu’il/elle dit plusieurs fois ?',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Pouvez-vous comprendre quelqu’un qui vous parle à voix basse ?',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Pouvez-vous comprendre quelqu’un qui vous parle au téléphone ?',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Pouvez-vous entendre le son d’une pièce de monnaie qui tombe par terre ?',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Pouvez-vous entendre le son d’une porte qui se ferme ?',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Pouvez-vous entendre quelqu’un qui s’approche de vous par derrière ?',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Pouvez-vous entendre quelqu’un qui vous parle dans un environnement bruyant, comme par exemple un bar ou un restaurant ?',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Pouvez-vous tenir une conversation dans un groupe lorsque plusieurs personnes parlent en même temps ?',
      type: QuestionType.single,
      answerTemplateNr: 1
    }
  ],
  answerTemplates: [
    [
      {
        answer: 'Toujours',
        value: 0
      },
      {
        answer: 'Occasionnellement',
        value: 1
      },
      {
        answer: 'Jamais',
        value: 2
      }
    ],
    [
      {
        answer: 'Non, je ne peux pas',
        value: 0
      },
      {
        answer: 'Avec quelques difficultés',
        value: 1
      },
      {
        answer: 'Oui, sans difficulté',
        value: 2
      }
    ]
  ]
}
