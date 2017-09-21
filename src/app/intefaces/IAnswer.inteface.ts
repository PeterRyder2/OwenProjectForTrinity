export interface IJumpAnswerExtension {
    jumpTo: number;
}

export interface IAnswer {
    answer: string;
    value: number;
    selected?: boolean;
}
