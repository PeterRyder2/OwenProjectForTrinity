import { QuestionType } from '../../../enums/QuestionType.enum';
import { IQuestionnaire } from '../../../interfaces/IQuestionnaire.interface';

export let IQCODE_fr: IQuestionnaire = {
  id: 'IQCODE',
  title: 'Questionnaire de mémoire',
  questions: [
    {
      question: 'Par rapport à il y a dix ans, comment cette personne: Se souvenir de certains renseignements concernant la famille et les proches, par exemple leur profession, leur date d\'anniversaire, leur adresse',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Par rapport à il y a dix ans, comment cette personne: Se souvenir d\'événements qui se sont produits récemment',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Par rapport à il y a dix ans, comment cette personne: Se souvenir de conversations récentes, quelques jours plus tard',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Par rapport à il y a dix ans, comment cette personne: Se rappeler son adresse et son numéro de téléphone',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Par rapport à il y a dix ans, comment cette personne: Se rappeler le jour et le mois en cours',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Par rapport à il y a dix ans, comment cette personne: Se rappeler où sont généralement rangées les choses',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Par rapport à il y a dix ans, comment cette personne: Se rappeler où trouver des objets rangés à des endroits inhabituels',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Par rapport à il y a dix ans, comment cette personne: Savoir comment utiliser des appareils ménagers familiers',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Par rapport à il y a dix ans, comment cette personne: Apprendre à utiliser de nouveaux objets ou appareils ménagers dans la maison',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Par rapport à il y a dix ans, comment cette personne: Apprendre des nouvelles choses en général',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Par rapport à il y a dix ans, comment cette personne: Suivre une histoire dans un livre ou à la télévision',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Par rapport à il y a dix ans, comment cette personne: Prendre des décisions concernant les problèmes du quotidien',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Par rapport à il y a dix ans, comment cette personne: Gérer son argent pour faire ses achats',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Par rapport à il y a dix ans, comment cette personne: Gérer ses finances personnelles (Par exemple payer les comptes, faire des retraits à la banques)',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Par rapport à il y a dix ans, comment cette personne: Gérer d\'autres problèmes arithmétiques du quotidien, par exemple savoir quelle quantité d\'aliments acheter, savoir combien de temps s\'est écoulé entre les visites d\'amis/membres de la famille',
      type: QuestionType.single,
      answerTemplateNr: 0
    },
    {
      question: 'Par rapport à il y a dix ans, comment cette personne: Utiliser son intelligence pour comprendre ce qui se passe, utiliser ses capacités de réflexion et être capable de raisonner',
      type: QuestionType.single,
      answerTemplateNr: 0
    }
  ],
  answerTemplates: [
    [
      {
        answer: 'Beaucoup mieux',
        value: 1
      },
      {
        answer: 'Un peu mieux',
        value: 2
      },
      {
        answer: 'Aucun changement',
        value: 3
      },
      {
        answer: 'Un peu moins bien',
        value: 4
      },
      {
        answer: 'Beaucoup moins bien',
        value: 5
      }
    ]
  ]
}
