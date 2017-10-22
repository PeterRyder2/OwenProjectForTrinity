import { FakeResultComponent } from '../fake-result/fake-result.component';
import { HomeComponent } from '../home/home.component';
import {
  CognitionTestDescriptionComponent,
} from '../cognition/cognition-test-description/cognition-test-description.component';
import { Vf14ResultComponent } from '../vision/vf14-result/vf14-result.component';
import { Vf14DescriptionComponent } from '../vision/vf14-description/vf14-description.component';
import { VisionTestComponent } from '../vision/vision-test/vision-test.component';
import { VisionTestResultComponent } from '../vision/vision-test-result/vision-test-result.component';
import { VisionTestDescriptionComponent } from '../vision/vision-test-description/vision-test-description.component';
import {
  VisionChapterDescriptionComponent,
} from '../vision/vision-chapter-description/vision-chapter-description.component';
import { IqcodeResultComponent } from '../cognition/iqcode-result/iqcode-result.component';
import { IqcodeDescriptionComponent } from '../cognition/iqcode-description/iqcode-description.component';
import { CognitionTestResultComponent } from '../cognition/cognition-test-result/cognition-test-result.component';
import { HddaDescriptionComponent } from '../hearing/hdda-description/hdda-description.component';
import {
  HearingChapterDescriptionComponent,
} from '../hearing/hearing-chapter-description/hearing-chapter-description.component';
import {
  CognitionChapterDescriptionComponent,
} from '../cognition/cognition-chapter-description/cognition-chapter-description.component';
import { DigitTripleTestResultComponent } from '../hearing/digit-triple-test-result/digit-triple-test-result.component';
import {
  DigitTripleTestDescriptionComponent,
} from '../hearing/digit-triple-test-description/digit-triple-test-description.component';
import { CognitionTestComponent } from '../cognition/cognition-test/cognition-test.component';
import { DigitTripleTestComponent } from '../hearing/digit-triple-test/digit-triple-test.component';
import { QuestionnaireComponent } from '../questionnaire/questionnaire.component';
import { ChapterSelectionComponent } from '../chapter-selection/chapter-selection.component';
import { ProcedureService } from '../../services/procedure.service';
import { ProcedureHostDirective } from '../../directives/procedure-host.directive';
import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HddaResultComponent } from '../hearing/hdda-result/hdda-result.component';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'snscg-procedure-container',
  templateUrl: './procedure-container.component.html',
  styleUrls: ['./procedure-container.component.scss'],
  entryComponents: [
    HomeComponent,
    ChapterSelectionComponent,
    QuestionnaireComponent,
    FakeResultComponent,

    HearingChapterDescriptionComponent,

    DigitTripleTestDescriptionComponent,
    DigitTripleTestComponent,
    DigitTripleTestResultComponent,

    HddaDescriptionComponent,
    HddaResultComponent,

    CognitionChapterDescriptionComponent,

    CognitionTestDescriptionComponent,
    CognitionTestComponent,
    CognitionTestResultComponent,

    IqcodeDescriptionComponent,
    IqcodeResultComponent,

    VisionChapterDescriptionComponent,

    VisionTestDescriptionComponent,
    VisionTestComponent,
    VisionTestResultComponent,

    Vf14DescriptionComponent,
    Vf14ResultComponent
  ]
})
export class ProcedureContainerComponent implements OnInit, OnDestroy {

  @ViewChild(ProcedureHostDirective) procedureHost: ProcedureHostDirective;

  activeKey = '';

  get language() {
    return this.languageService.components.procedureContainer;
  }

  constructor(
    public languageService: LanguageService,
    private componentFactoryResolver: ComponentFactoryResolver,
    public procedureService: ProcedureService
  ) { }

  ngOnInit() {
    this.procedureService.init(this);
    window.addEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
  }

  ngOnDestroy() {
    window.removeEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
    this.procedureService.destroy();
  }

  loadComponent = <T>(component: new (...args: any[]) => T) => {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    let viewContainerRef = this.procedureHost.viewContainerRef;
    viewContainerRef.clear();

    let ComponentRef = viewContainerRef.createComponent(componentFactory);
    return ComponentRef;
  }

  continue() {
    this.procedureService.continue();
  }

  skip() {
    this.procedureService.skip();
  }



  keyDownEventListener = (e: KeyboardEvent) => {
    if (e.key.match('Enter'))
      this.continue();
    this.activeKey = e.key;
  }


  keyUpEventListener = (e: KeyboardEvent) => {
    this.activeKey = '';
  }

}
