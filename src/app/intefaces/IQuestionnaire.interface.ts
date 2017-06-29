import { IQuestion } from './IQuestion.interface';
import { IAnswer } from './IAnswer.inteface';
export interface IQuestionnaire {
    id: string;
    title: string;
    forceResponse?: boolean;
    backEnabled?: boolean;
    questions: IQuestion[];
    answerTemplates?: IAnswer[][];
}
