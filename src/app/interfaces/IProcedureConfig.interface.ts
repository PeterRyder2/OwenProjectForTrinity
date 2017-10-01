export interface IProcedure {
    chapters: IChapter[];
}

export interface IChapter {
    name: string;
    description: new (...args: any[]) => IDescriptionComponent;
    tests: ITest[];
    skipped?: boolean;
}

export interface IDescriptionComponent {
    continue(): Promise<boolean>;
}

export interface ITest {
    name: string;
    description: new (...args: any[]) => IDescriptionComponent;
    component: new (...args: any[]) => ITestComponent;
    inputData?: IInputData[];
    result?: ITestResult;
    resultComponent: new (...args: any[]) => IResultComponent;
    skipped?: boolean;
}

export interface IInputData {
    identifier: string;
    data: any;
}

export interface ITestResult {
    score: number | string;
    type: any; // TODO
}

export interface IResultComponent {
    resultData: ITestResult;
}

export interface ITestComponent {
    continue(): Promise<ITestResponse>;
    subscribeContinueDisabled(cb: (isDisaled: boolean) => void): void;
}

export type ITestResponse = {
    isTestFinnished: false;
} | {
        isTestFinnished: true;
        result: ITestResult;
    };
