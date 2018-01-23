import { FakeResultComponent } from '../components/fake-result/fake-result.component';
import { SettingsService } from './settings.service';
import { IdService } from './id.service';
import { ComponentRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { ChapterSelectionComponent } from '../components/chapter-selection/chapter-selection.component';
import { HomeComponent } from '../components/home/home.component';
import { ProcedureContainerComponent } from '../components/procedure-container/procedure-container.component';
import { IProcedure, ITestResponse, IInputData } from '../interfaces/IProcedureConfig.interface';
import { Util } from '../lib/util';
import { procedureConfig } from '../lib/procedure';
import { ProcedureState } from '../enums/Procedure.State.enum';

@Injectable()
export class ProcedureService {

  static continue: () => void;

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

  constructor(private idService: IdService, private settings: SettingsService) {
    ProcedureService.continue = () => { this.continue(); };
  }

  skip() {
    switch (this.position.state) {
      case ProcedureState.ChapterSelection:
        throw new Error(`one should not have the option to press skip in the chapter selection`);

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
    this.isContinueDisabled = false;
  }

  reset() {
    this.position.init();
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
    if (!this.idService.wasSet)
      this.idService.generateId('snscg-ec');
    this.idService.annotation = 'this data comes from the SenseCog eChecker';
    this.procedure = Util.deepCloneObject(procedureConfig);
    this.position.init();
    this.procedureContainer.loadComponent(HomeComponent);
  }

  destroy() {
    this.idService.reset();
    this.procedureContainer = null;
    this.position.destroy();
  };

  continueTestComponent = async (): Promise<ITestResponse> => {
    return {
      result: 0,
    };
  };
  continueDescriptionComponent = async (): Promise<boolean | IInputData[]> => { return true; };

  async continue() {
    if (!this.isContinueDisabled)
      switch (this.position.state) {
        case ProcedureState.Void:
          break;
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
          console.log(this.idService.id)
          let chapterDescriptionOver = await this.continueDescriptionComponent();
          if (chapterDescriptionOver) {
            this.position.state = ProcedureState.TestDescription;
            this.loadNextTestDescription();
          }
          break;

        case ProcedureState.TestDescription:
          let testDescriptionOver = await this.continueDescriptionComponent();
          if (testDescriptionOver) {
            if (Array.isArray(testDescriptionOver)) {
              if (!this.activeTest.inputData) this.activeTest.inputData = [];
              this.activeTest.inputData.push(...testDescriptionOver);
            }
            this.position.state = ProcedureState.Test;
            this.loadNextTest();
          }
          break;

        case ProcedureState.Test:
          let testResponse = await this.continueTestComponent();
          if (testResponse !== false) {
            this.activeTest.result = testResponse;
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
      if (!this.activeChapter.tests[i].skipped) {
        this.position.test = i;
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
    if (descriptionComponentRef.instance.subscribeContinueDisabled)
      descriptionComponentRef.instance.subscribeContinueDisabled((isDisabled) => { this.isContinueDisabled = isDisabled; })
    this.continueDescriptionComponent = descriptionComponentRef.instance.continue;
    this.position.name = this.activeTest.name + 'Description';
  }

  private loadNextTest() {
    let testComponentRef = this.procedureContainer.loadComponent(this.activeTest.component);
    testComponentRef.instance.subscribeContinueDisabled((isDisabled) => { this.isContinueDisabled = isDisabled; })
    this.continueTestComponent = testComponentRef.instance.continue;
    if (this.activeTest.inputData !== undefined)
      for (let inputData of this.activeTest.inputData) {
        if (inputData.data[this.settings.languageStr] !== undefined)
          testComponentRef.instance[inputData.identifier] = inputData.data[this.settings.languageStr];
        else
          testComponentRef.instance[inputData.identifier] = inputData.data;
      }
    this.position.name = this.activeTest.name;
  }

  private loadNextTestResult() {
    if (this.settings.showActualResult) {
      let resultComponentRef = this.procedureContainer.loadComponent(this.activeTest.resultComponent);
      resultComponentRef.instance.resultData = this.activeTest.result;
    } else {
      let resultComponentRef = this.procedureContainer.loadComponent(FakeResultComponent);
      resultComponentRef.instance.name = this.activeTest.name;
    }
    this.position.name = this.activeTest.name + 'Result';
  }

}

class ProcedurePosition {
  state = ProcedureState.Void;
  chapter = 0;
  test = 0;

  private onNameChangeSubject = new BehaviorSubject('no procedure active');
  onNameChange = this.onNameChangeSubject.asObservable();
  set name(val: string) {
    this.onNameChangeSubject.next(val);
  }
  get name() {
    return this.onNameChangeSubject.getValue();
  }

  destroy() {
    this.state = ProcedureState.Void;
    this.chapter = 0;
    this.test = 0;
    this.name = 'no procedure active';
  }

  init() {
    this.state = ProcedureState.Home;
    this.chapter = 0;
    this.test = 0;
    this.name = 'Home';
  }
}
