import { QuestionnaireComponent } from '../components/questionnaire/questionnaire.component';
import { CognitionTestComponent } from '../components/cognition/cognition-test/cognition-test.component';
import { DigitTripleTestComponent } from '../components/hearing/digit-triple-test/digit-triple-test.component';
import { BehaviorSubject } from 'rxjs/Rx';
import { DescriptionComponent } from '../components/description/description.component';
import { ProcedureContainerComponent } from '../components/procedure-container/procedure-container.component';
import { ChapterSelectionComponent } from '../components/chapter-selection/chapter-selection.component';
import { Error } from 'tslint/lib/error';
import { IProcedure } from '../intefaces/IProcedureConfig.interface';
import { ComponentRef, Injectable } from '@angular/core';
import { HDDA, VF14, IQCODE } from './questionnaires';

@Injectable()
export class ProcedureService {

  private procedure: IProcedure = {
    chapters: [
      {
        name: 'Hearing',
        description: {
          name: 'HearingChapterDescription'
        },
        tests: [
          {
            name: 'HDDA',
            description: {
              name: 'HDDADescription'
            },
            component: QuestionnaireComponent,
            inputData: [
              {
                identifier: 'questionnaire',
                data: HDDA
              }
            ]
          },
          {
            name: 'DigitTripleTest',
            description: {
              name: 'DigitTripleTestDescription'
            },
            component: DigitTripleTestComponent
          }
        ]
      },
      {
        name: 'Cognition',
        description: {
          name: 'CognitionChapterDescription'
        },
        tests: [
          {
            name: 'IQCODE',
            description: {
              name: 'IQCODEDescription'
            },
            component: QuestionnaireComponent,
            inputData: [
              {
                identifier: 'questionnaire',
                data: IQCODE
              }
            ]
          },
          {
            name: 'CognitionTest',
            description: {
              name: 'CognitionTestDescription'
            },
            component: CognitionTestComponent
          }
        ]
      },
      {
        name: 'Vision',
        description: {
          name: 'VisionChapterDescription'
        },
        tests: [
          {
            name: 'VF14',
            description: {
              name: 'VF14Description'
            },
            component: QuestionnaireComponent,
            inputData: [
              {
                identifier: 'questionnaire',
                data: VF14
              }
            ]
          },
          // {
          //   name: 'VisionTest',
          //   description: {
          //     name: 'VisionTestDescription'
          //   },
          //   component: null
          // }
        ]
      },
    ]
  };

  position = new ProcedurePosition();

  get activeChapter() {
    return this.procedure.chapters[this.position.chapter];
  }

  get activeTest() {
    return this.procedure.chapters[this.position.chapter].tests[this.position.test];
  }

  chapterSelectionComponentRef: ComponentRef<ChapterSelectionComponent>;

  procedureContainer: ProcedureContainerComponent;

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
        // TODO cancel test
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

  private skipChapter() {
    this.activeChapter.skipped = true;
    let chaptersLeft = this.nextChapter();
    if (!chaptersLeft) {
      console.log('TODO end');
      // TODO
    }
  }

  private skipTest() {
    this.activeTest.skipped = true;
    this.advance();
  }

  init(procedureContainer: ProcedureContainerComponent) {
    this.procedureContainer = procedureContainer;
    this.chapterSelectionComponentRef = this.procedureContainer.loadComponent(ChapterSelectionComponent);
    this.chapterSelectionComponentRef.instance.procedure = this.procedure;
  }

  continue() {
    switch (this.position.state) {
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
        this.position.state = ProcedureState.TestDescription;
        this.loadNextTestDescription();
        break;

      case ProcedureState.TestDescription:
        this.position.state = ProcedureState.Test;
        this.loadNextTest();
        break;

      case ProcedureState.Test:
        let isTestOver = this.continueTest();
        if (isTestOver) {
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

  private continueTest() {
    // TODO
    return true;
  }

  private advance() {
    let testsLeft = this.nextTest();
    if (!testsLeft) {
      let chaptersLeft = this.nextChapter();
      if (!chaptersLeft) {
        console.log('TODO end')
        // TODO continue to last
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
    let descriptionComponentRef = this.procedureContainer.loadComponent(DescriptionComponent);
    descriptionComponentRef.instance.name = this.activeChapter.description.name;
    this.position.name = this.activeChapter.description.name;
  }

  private loadNextTestDescription() {
    let descriptionComponentRef = this.procedureContainer.loadComponent(DescriptionComponent);
    descriptionComponentRef.instance.name = this.activeTest.description.name;
    this.position.name = this.activeTest.description.name;
  }

  private loadNextTest() {
    let descriptionComponentRef = this.procedureContainer.loadComponent(this.activeTest.component);
    // Correct component needs to be implemented
    if (this.activeTest.inputData !== undefined)
      for (let inputData of this.activeTest.inputData) {
        descriptionComponentRef.instance[inputData.identifier] = inputData.data;
      }
    this.position.name = this.activeTest.name;
  }

  private loadNextTestResult() {
    let descriptionComponentRef = this.procedureContainer.loadComponent(DescriptionComponent);
    // Correct component needs to be implemented and the point to the result object of the test
    descriptionComponentRef.instance.name = this.activeTest.name + ' RESULT';
    this.position.name = this.activeTest.name + 'Result';
  }

}

enum ProcedureState {
  ChapterSelection,
  ChapterDescription,
  TestDescription,
  Test,
  TestResult,
  EndResult
}


class ProcedurePosition {
  state = ProcedureState.ChapterSelection;
  chapter = 0;
  test = 0;

  private nameSubject = new BehaviorSubject('ChapterSelection');
  onNameChange = this.nameSubject.asObservable();
  set name(val: string) {
    this.nameSubject.next(val);
  }
  get name() {
    return this.nameSubject.getValue();
  }
}
