export interface IQuestion {
    question: string;
    answered?: boolean;
    type?: boolean;
    answers: [
        {
            answer: string;
            score?: number;
        }
    ];
}
