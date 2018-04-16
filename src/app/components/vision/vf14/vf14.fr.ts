import { QuestionType } from '../../../enums/QuestionType.enum';
import { IQuestionnaire } from '../../../interfaces/IQuestionnaire.interface';

export let VF14_fr: IQuestionnaire = {
  id: 'VF-14',
  title: 'Questionnaire concernant votre vision',
  forceResponse: true,
  questions: [
    {
      // tslint:disable-next-line:max-line-length
      question: 'Avez-vous des difficultés, même avec des lunettes, à lire les petits caractères, comme les étiquettes de médicaments, l\'annuaire ou les étiquettes de produits alimentaires ?',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Avez-vous des difficultés, même avec des lunettes, à lire le journal ou un livre ?',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      // tslint:disable-next-line:max-line-length
      question: 'Avez-vous des difficultés, même avec des lunettes, à lire des livres ou des journaux en gros caractères, ou les chiffres sur un téléphone ?',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Avez-vous des difficultés, même avec des lunettes, à reconnaître des personnes lorsqu\'elles sont près de vous ?',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Avez-vous des difficultés, même avec des lunettes, à voir des marches, des escaliers ou des bordures de trottoir ?',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Avez-vous des difficultés, même avec des lunettes, à lire les panneaux de signalisation, les noms des rues ou les enseignes des magasins ?',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Avez-vous des difficultés, même avec des lunettes, à réaliser des travaux manuels minutieux, tels que la couture, le tricot, le crochet ou la menuiserie ?',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Avez-vous des difficultés, même avec des lunettes, pour remplir des chèques ou des formulaires ?',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Avez-vous des difficultés, même avec des lunettes, pour jouer à des jeux de société tels que le bingo, les dominos, les jeux de cartes ou le mahjong ?',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Avez-vous des difficultés, même avec des lunettes, pour participer à des activités sportives telles que le bowling, le handball, le tennis ou le golf ?',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Avez-vous des difficultés, même avec des lunettes, à cuisiner ?',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Avez-vous des difficultés, même avec des lunettes, à regarder la télévision ?',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Conduisez une voiture actuellement ?',
      type: QuestionType.jump,
      answers: [
        {
          answer: 'Oui',
          jumpTo: 13,
          value: null
        },
        {
          answer: 'Non',
          jumpTo: 15,
          value: null
        }
      ]
    },
    {
      question: 'A quel point la conduite de jour est-elle difficile pour vous en raison de votre vision ?',
      answerTemplateNr: 1,
      type: QuestionType.single
    },
    {
      question: 'A quel point la conduite de nuit est-elle difficile pour vous en raison de votre vision ?',
      answerTemplateNr: 1,
      type: QuestionType.single,
      jumpTo: -1
    },
    {
      question: 'Avez-vous déjà conduit une voiture ?',
      type: QuestionType.jump,
      answers: [
        {
          answer: 'Oui',
          jumpTo: 16,
          value: null
        },
        {
          answer: 'Non',
          jumpTo: -1,
          value: null
        }
      ]
    },
    {
      question: 'Quand avez-vous arrêté de conduire ?',
      type: QuestionType.single,
      answers: [
        {
          answer: 'Il y a moins de 6 mois',
          value: null
        },
        {
          answer: 'Il y a entre 6 mois et 12 mois',
          value: null
        },
        {
          answer: 'Il y a plus de 12 mois',
          value: null
        }
      ]
    },
    {
      question: 'Pourquoi avez-vous arrêté de conduite ?',
      type: QuestionType.single,
      answers: [
        {
          answer: 'Problèmes de vue',
          value: null
        },
        {
          answer: 'Autre maladie',
          value: null
        },
        {
          answer: 'Autre raison',
          value: null
        }
      ]
    }
  ],
  answerTemplates: [
    [
      {
        answer: 'Non applicable',
        value: null
      },
      {
        answer: 'Non',
        value: 4
      },
      {
        answer: 'Oui, avec un peu de difficultés',
        value: 3
      },
      {
        answer: 'Oui, avec des difficultés modérées',
        value: 2
      },
      {
        answer: 'Oui, avec beaucoup de difficultés',
        value: 1
      },
      {
        answer: 'Oui, et incapable de réaliser cette activité',
        value: 0
      }
    ],
    [
      {
        answer: 'Aucune difficulté',
        value: 4
      },
      {
        answer: 'Un peu de difficultés',
        value: 3
      },
      {
        answer: 'Une difficulté modérée',
        value: 2
      },
      {
        answer: 'Beaucoup de difficultés',
        value: 1
      }
    ]
  ]
}
