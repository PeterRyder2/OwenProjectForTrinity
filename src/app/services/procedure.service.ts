import { ComponentRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { ChapterSelectionComponent } from '../components/chapter-selection/chapter-selection.component';
import { HomeComponent } from '../components/home/home.component';
import { ProcedureContainerComponent } from '../components/procedure-container/procedure-container.component';
import { IProcedure, ITestResponse } from '../intefaces/IProcedureConfig.interface';
import { Util } from '../lib/util';
import { procedureConfig } from '../lib/procedure';

@Injectable()
export class ProcedureService {

  private procedure: IProcedure;

  chapterSelectionComponentRef: ComponentRef<ChapterSelectionComponent>;

  procedureContainer: ProcedureContainerComponent;

  position = new ProcedurePosition();

  isContinueDisabled;

  private get activeChapter() {
    return this.procedure.chapters[this.position.chapter];
  }

  private get activeTest() {
    return this.procedure.chapters[this.position.chapter].tests[this.position.test];
  }

  constructor() { }

  skip() {
    switch (this.position.state) {
      case ProcedureState.ChapterSelection:
        throw new Error(`one should not have th option to press skip in the chapter selection`);

      case ProcedureState.ChapterDescription:
        this.skipChapter();
        break;

      case ProcedureState.TestDescription:
        this.skipTest();
        break;

      case ProcedureState.Test:
        this.skipTest();
        break;

      case ProcedureState.TestResult:
        this.continue();
        break;

      default:
        throw new Error(`apperently the ProcedureState was out of its enum range,
           this should not happen and something has to be messed up badly`);
    }
  }

  reset() {
    this.position.reset();
    this.init();
  }

  private skipChapter() {
    this.activeChapter.skipped = true;
    let chaptersLeft = this.nextChapter();
    if (!chaptersLeft) {
      this.endProcedure();
    }
  }

  private skipTest() {
    this.activeTest.skipped = true;
    this.advance();
  }

  private endProcedure() {
    this.reset();
  }

  init(procedureContainer?: ProcedureContainerComponent) {
    if (procedureContainer)
      this.procedureContainer = procedureContainer;
    this.isContinueDisabled = false;
    this.procedure = Util.deepCloneObject(procedureConfig);
    this.procedureContainer.loadComponent(HomeComponent);
  }

  continueTestComponent = async (): Promise<ITestResponse> => {
    return {
      isTestFinnished: true,
      result: {
        score: 0,
        type: null
      },
    };
  };
  continueDescriptionComponent = async () => { return true; };

  async continue() {
    if (!this.isContinueDisabled)
      switch (this.position.state) {
        case ProcedureState.Home:
          this.chapterSelectionComponentRef = this.procedureContainer.loadComponent(ChapterSelectionComponent);
          this.chapterSelectionComponentRef.instance.subscribeContinueDisabled((isDisabled) => { this.isContinueDisabled = isDisabled; })
          this.chapterSelectionComponentRef.instance.procedure = this.procedure;
          this.position.state = ProcedureState.ChapterSelection;
          break;
        case ProcedureState.ChapterSelection:
          for (let chapter of this.procedure.chapters) {
            chapter.skipped = this.chapterSelectionComponentRef.instance.chaptersToSkip.includes(chapter.name);
          }
          let allChaptersSkipped = !this.nextChapter(false);
          if (allChaptersSkipped) {
            // TODO send a message to pick atleast one
          }
          break;

        case ProcedureState.ChapterDescription:
          let chapterDescriptionOver = await this.continueDescriptionComponent();
          if (chapterDescriptionOver) {
            this.position.state = ProcedureState.TestDescription;
            this.loadNextTestDescription();
          }
          break;

        case ProcedureState.TestDescription:
          let testDescriptionOver = await this.continueDescriptionComponent();
          if (testDescriptionOver) {
            this.position.state = ProcedureState.Test;
            this.loadNextTest();
          }
          break;

        case ProcedureState.Test:
          let testResponse = await this.continueTestComponent();
          if (testResponse.isTestFinnished) {
            this.activeTest.result = testResponse.result;
            this.position.state = ProcedureState.TestResult;
            this.loadNextTestResult();
          }
          break;

        case ProcedureState.TestResult:
          this.advance();
          break;

        default:
          throw new Error(`apperently the ProcedureState was out of its enum range,
           this should not happen and something has to be messed up badly`);
      }
  }

  private advance() {
    let testsLeft = this.nextTest();
    if (!testsLeft) {
      let chaptersLeft = this.nextChapter();
      if (!chaptersLeft) {
        this.endProcedure();
      }
    }
  }

  private nextChapter(countUp = true) {
    let chaptersLeft = false;
    let nextChapter = countUp ? this.position.chapter + 1 : this.position.chapter;
    for (let i = nextChapter; i < this.procedure.chapters.length; i++) {
      if (!this.procedure.chapters[i].skipped) {
        this.position.chapter = i;
        this.position.test = 0;
        this.position.state = ProcedureState.ChapterDescription;
        this.loadNextChapterDescription();
        chaptersLeft = true;
        break;
      }
    }
    return chaptersLeft;
  }

  private nextTest(countUp = true) {
    let testsLeft = false;
    let nextTest = countUp ? this.position.test + 1 : this.position.test;
    for (let i = nextTest; i < this.activeChapter.tests.length; i++) {
      if (!this.procedure.chapters[i].skipped) {
        this.position.test++;
        this.position.state = ProcedureState.TestDescription;
        this.loadNextTestDescription();
        testsLeft = true;
      }
    }
    return testsLeft;
  }

  private loadNextChapterDescription() {
    let descriptionComponentRef = this.procedureContainer.loadComponent(this.activeChapter.description);
    this.continueDescriptionComponent = descriptionComponentRef.instance.continue;
    this.position.name = this.activeChapter.name + 'ChapterDescription';
  }

  private loadNextTestDescription() {
    let descriptionComponentRef = this.procedureContainer.loadComponent(this.activeTest.description);
    this.continueDescriptionComponent = descriptionComponentRef.instance.continue;
    this.position.name = this.activeTest.name + 'Description';
  }

  private loadNextTest() {
    let testComponentRef = this.procedureContainer.loadComponent(this.activeTest.component);
    testComponentRef.instance.subscribeContinueDisabled((isDisabled) => { this.isContinueDisabled = isDisabled; })
    this.continueTestComponent = testComponentRef.instance.continue;
    if (this.activeTest.inputData !== undefined)
      for (let inputData of this.activeTest.inputData) {
        testComponentRef.instance[inputData.identifier] = inputData.data;
      }
    this.position.name = this.activeTest.name;
  }

  private loadNextTestResult() {
    let resultComponentRef = this.procedureContainer.loadComponent(this.activeTest.resultComponent);
    resultComponentRef.instance.resultData = this.activeTest.result;
    this.position.name = this.activeTest.name + 'Result';
  }

}

enum ProcedureState {
  Home,
  ChapterSelection,
  ChapterDescription,
  TestDescription,
  Test,
  TestResult,
  EndResult
}


class ProcedurePosition {
  state = ProcedureState.Home;
  chapter = 0;
  test = 0;

  private onNameChangeSubject = new BehaviorSubject('Home');
  onNameChange = this.onNameChangeSubject.asObservable();
  set name(val: string) {
    this.onNameChangeSubject.next(val);
  }
  get name() {
    return this.onNameChangeSubject.getValue();
  }

  reset() {
    this.state = ProcedureState.Home;
    this.chapter = 0;
    this.test = 0;
    this.name = 'Home';
  }
}
