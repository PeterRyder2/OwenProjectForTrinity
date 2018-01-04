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
    continue(): Promise<boolean | IInputData[]>;
}

export interface ITest {
    name: string;
    description: new (...args: any[]) => IDescriptionComponent;
    component: new (...args: any[]) => ITestComponent;
    inputData?: IInputData[];
    result?: ITestResult<any>;
    resultComponent: new (...args: any[]) => IResultComponent;
    skipped?: boolean;
}

export interface IInputData {
    identifier: string;
    data: any;
}

export interface ITestResult<T> {
    result: T;
}

export interface IResultComponent {
    resultData: ITestResult<any>;
}

export interface ITestComponent {
    continue(): Promise<ITestResponse>;
    subscribeContinueDisabled(cb: (isDisaled: boolean) => void): void;
}

export type ITestResponse = false | ITestResult<any>;
