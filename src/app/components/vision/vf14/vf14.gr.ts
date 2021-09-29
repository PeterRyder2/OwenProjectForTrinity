import { QuestionType } from '../../../enums/QuestionType.enum';
import { IQuestionnaire } from '../../../interfaces/IQuestionnaire.interface';

export let VF14_gr: IQuestionnaire = {
  id: 'VF-14',
  title: 'Ερωτηματολόγιο οράσεως',
  forceResponse: true,
  questions: [
    {
      // tslint:disable-next-line:max-line-length
      question: 'Αντιμετωπίζετε οποιαδήποτε δυσκολία, ακόμη και με γυαλιά, στο να διαβάζετε μικρά γράμματα όπως οδηγίες ετικετών σε μπουκάλια φαρμάκων, τηλεφωνικό κατάλογο, ετικέτες φαγητών;',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Αντιμετωπίζετε οποιαδήποτε δυσκολία, ακόμη και με γυαλιά, στο να διαβάζετε εφημερίδα ή ένα βιβλίο;',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      // tslint:disable-next-line:max-line-length
      question: 'Αντιμετωπίζετε οποιαδήποτε δυσκολία, ακόμη και με γυαλιά, στο να διαβάζετε ένα βιβλίο με μεγάλα γράμματα, ή εφημερίδες με μεγάλα γράμματα ή αριθμούς πάνω σε τηλέφωνο;',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Αντιμετωπίζετε οποιαδήποτε δυσκολία, ακόμη και με γυαλιά, στο να αναγνωρίζετε ανθρώπους όταν είναι κοντά σας;',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Αντιμετωπίζετε οποιαδήποτε δυσκολία, ακόμη και με γυαλιά, στο να βλέπετε σκαλιά, σκάλες, ή άκριες πεζοδρομίων;',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Αντιμετωπίζετε οποιαδήποτε δυσκολία, ακόμη και με γυαλιά, στο να διαβάζετε πινακίδες τροχαίας, δρόμων ή καταστημάτων;',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Αντιμετωπίζετε οποιαδήποτε δυσκολία, ακόμη και με γυαλιά, στο να κάνετε δουλειές με τα χέρια σας όπως ράψιμο, πλέξιμο, κέντημα, ξυλουργική;',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Αντιμετωπίζετε οποιαδήποτε δυσκολία, ακόμη και με γυαλιά, στο να συμπληρώνετε επιταγές ή άλλα έντυπα;',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Αντιμετωπίζετε οποιαδήποτε δυσκολία, ακόμη και με γυαλιά, στο το να παίζετε παιχνίδια όπως τόμπολα, ντόμινο, παιχνίδια με τράπουλα, ματζόνγκ;',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Αντιμετωπίζετε οποιαδήποτε δυσκολία, ακόμη και με γυαλιά,  στο να λαμβάνετε μέρος σε αθλητικές δραστηριότητες όπως μπόουλινγκ, χειροσφαίριση, αντισφαίριση, γκολφ κτλ.;',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Αντιμετωπίζετε οποιαδήποτε δυσκολία, ακόμη και με γυαλιά, στο να μαγειρεύετε;',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Αντιμετωπίζετε οποιαδήποτε δυσκολία, ακόμη και με γυαλιά, στο να παρακολουθείτε τηλεόραση;',
      answerTemplateNr: 0,
      type: QuestionType.single
    },
    {
      question: 'Οδηγείτε αυτοκίνητο αυτήν την περίοδο;',
      type: QuestionType.jump,
      answers: [
        {
          answer: 'Ναι',
          jumpTo: 13,
          value: null
        },
        {
          answer: 'Όχι',
          jumpTo: 15,
          value: null
        }
      ]
    },
    {
      question: 'Πόση δυσκολία αντιμετωπίζετε κατά την οδήγηση την ημέρα λόγω της όρασης σας;',
      answerTemplateNr: 1,
      type: QuestionType.single
    },
    {
      question: 'Πόση δυσκολία αντιμετωπίζεται κατά την οδήγηση το βράδυ λόγω της όρασης σας;',
      answerTemplateNr: 1,
      type: QuestionType.single,
      jumpTo: -1
    },
    {
      question: 'Έχετε οδηγήσει ποτέ αυτοκίνητο;',
      type: QuestionType.jump,
      answers: [
        {
          answer: 'Ναι',
          jumpTo: 16,
          value: null
        },
        {
          answer: 'Όχι',
          jumpTo: -1,
          value: null
        }
      ]
    },
    {
      question: 'Πότε σταματήσατε να οδηγείτε;',
      type: QuestionType.single,
      answers: [
        {
          answer: 'Λιγότερο από πριν 6 μήνες',
          value: null
        },
        {
          answer: 'Πριν από 6-12 μήνες',
          value: null
        },
        {
          answer: 'Περισσότερο από πριν 12 μήνες ',
          value: null
        }
      ]
    },
    {
      question: 'Γιατί σταματήσατε να οδηγείτε;',
      type: QuestionType.single,
      answers: [
        {
          answer: 'Όραση',
          value: null
        },
        {
          answer: 'Άλλη ασθένεια',
          value: null
        },
        {
          answer: 'Άλλος λόγος',
          value: null
        }
      ]
    }
  ],
  answerTemplates: [
    [
      {
        answer: 'Δεν ισχύει',
        value: null
      },
      {
        answer: 'όχι',
        value: 4
      },
      {
        answer: 'ναι, με μικρή δυσκολία',
        value: 3
      },
      {
        answer: 'ναι, με μέτρια δυσκολία',
        value: 2
      },
      {
        answer: 'ναι, με μεγάλη δυσκολία',
        value: 1
      },
      {
        answer: 'ναι, και δεν είμαι ικανός/η να κάνω τη δραστηριότητα',
        value: 0
      }
    ],
    [
      {
        answer: 'Καμιά δυσκολία',
        value: 4
      },
      {
        answer: 'Μικρή δυσκολία',
        value: 3
      },
      {
        answer: 'Μέτριος βαθμός δυσκολίας',
        value: 2
      },
      {
        answer: 'Μεγάλη δυσκολία',
        value: 1
      }
    ]
  ]
}
