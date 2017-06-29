import { IAnswer } from './IAnswer.inteface';
import { QuestionType } from '../enums/QuestionType.enum';

export interface IQuestion {
    question: string;
    answered?: boolean;
    type: QuestionType;
    answers?: IAnswer[];
    answerTemplateNr?: number;
    jumpTo?: number;
}
