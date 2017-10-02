import { IAnswer, IJumpAnswerExtension } from './IAnswer.inteface';
import { QuestionType } from '../enums/QuestionType.enum';

export type IQuestion = INormalQuestion | IJumpQuestion;

export interface INormalQuestion {
    question: string;
    answered?: boolean;
    type: QuestionType.single | QuestionType.multiple;
    answers?: Array<IAnswer>;
    answerTemplateNr?: number;
    jumpTo?: number;
}

export interface IJumpQuestion {
    question: string;
    answered?: boolean;
    type: QuestionType.jump;
    answers: Array<IAnswer & IJumpAnswerExtension>;
}
