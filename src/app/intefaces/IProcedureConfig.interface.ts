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
    component: new () => ITestComponent;
    result?: ITestResult;
    skipped?: boolean;
}

interface ITestResult {
    score: number | string;
    type: any; // TODO
}

interface ITestComponent {
    continue: () => ITestResponse;
}

type ITestResponse = {
    isTestFinnished: false;
} | {
    isTestFinnished: true;
    result: ITestResult;
};
