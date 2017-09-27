export interface IProcedure {
    chapters: IChapter[];
}

interface IChapter {
    name: string;
    description: IDescription;
    tests: ITest[];
    skipped?: boolean;
}

interface IDescription {
    name: string;
}

interface ITest {
    name: string;
    description: IDescription;
    component: new(...args: any[]) => ITestComponent;
    inputData?: IInputData[];
    result?: ITestResult;
    skipped?: boolean;
}

interface IInputData {
    identifier: string;
    data: any;
}

export interface ITestResult {
    score: number | string;
    type: any; // TODO
}

export interface ITestComponent {
    continue(): Promise<ITestResponse>;
}

export type ITestResponse = {
    isTestFinnished: false;
} | {
    isTestFinnished: true;
    result: ITestResult;
};
