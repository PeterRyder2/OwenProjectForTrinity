export interface IJumpAnswerExtension {
    jumpTo: number;
}

export interface IAnswer {
    answer: string;
    value: number | null;
    selected?: boolean;
}
