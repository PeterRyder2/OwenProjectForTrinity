import { QuestionType } from '../../../enums/QuestionType.enum';
import { IQuestionnaire } from '../../../interfaces/IQuestionnaire.interface';

export let HDDA_gr: IQuestionnaire = {
  id: 'HDDA',
  title: 'Ερωτηματολόγιο ακοής',
  forceResponse: true,
  backEnabled: false,
  questions: [
    {
      question: 'Έχετε παρατηρήσει ότι δεν ακούτε τόσο καλά όσο στο παρελθόν;',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Σας έχει πει κάποιος/α ότι δεν ακούτε καλά;',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Η οικογένεια σας, σας λεει ότι έχετε την ένταση ήχου της τηλεόρασης/ ραδιοφώνου πολύ δυνατά;',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Όταν συνομιλείτε με κάποιον/α, χρειάζεται να του/της ζητήσετε να μιλά πιο δυνατά;',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Όταν συνομιλείτε με κάποιον/α χρειάζεται να του/της ζητήσετε να επαναλάβει αυτό που λέει αρκετές φορές;',
      type: QuestionType.single,
      answerTemplateNr: 0
    }, {
      question: 'Μπορείτε να καταλάβετε όταν κάποιος σας μιλάει χαμηλόφωνα;',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Μπορείτε να καταλάβετε όταν συνομιλείτε με κάποιον στο τηλέφωνο;',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Μπορείτε να ακούσετε τον ήχο ενός νομίσματος που πέφτει κάτω στο πάτωμα;',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Μπορείτε να ακούσετε τον ήχο μιας πόρτας που κλείνει;',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Μπορείτε να ακούσετε όταν κάποιος σας προσεγγίζει από πίσω;',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Μπορείτε να ακούσετε αν συνομιλείτε με κάποιον/α  σε ένα μέρος που έχει φασαρία (π.χ. σε μια μπυραρία, σε ένα εστιατόριο;)',
      type: QuestionType.single,
      answerTemplateNr: 1
    }, {
      question: 'Μπορείτε να ακολουθείτε μια συζήτηση σε μια ομάδα, όταν μιλούν ταυτόχρονα διάφορα άτομα;',
      type: QuestionType.single,
      answerTemplateNr: 1
    }
  ],
  answerTemplates: [
    [
      {
        answer: 'Πάντα',
        value: 0
      },
      {
        answer: 'Περιστασιακά',
        value: 1
      },
      {
        answer: 'Ποτέ',
        value: 2
      }
    ],
    [
      {
        answer: 'Όχι, δεν μπορώ',
        value: 0
      },
      {
        answer: 'Με κάποια δυσκολία',
        value: 1
      },
      {
        answer: 'Ναι, χωρίς δυσκολία',
        value: 2
      }
    ]
  ]
}
