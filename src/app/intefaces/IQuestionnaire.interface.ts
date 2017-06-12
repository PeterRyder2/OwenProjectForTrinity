import { IQuestion } from './IQuestion.interface';
export interface IQuestionnaire {
    id: string;
    title: string;
    forceResponse?: boolean;
    backEnabled?: boolean;
    questions: IQuestion[];
}
