import { TestIdResolver } from './services/test-id-resolver.service';
import { IdService } from './services/id.service';
import { ProcedureService } from './services/procedure.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LanguageService } from './services/language.service';
import { SettingsService } from './services/settings.service';
import { FocusDirective } from './directives/focus.directive';
import { CheckboxComponent } from './components/layout/checkbox/checkbox.component';
import { QuestionComponent } from './components/questionnaire/question/question.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { DividerComponent } from './components/layout/divider/divider.component';
import { PointDisplayComponent } from './components/layout/point-display/point-display.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProgressbarComponent } from './components/layout/progressbar/progressbar.component';
import { ConfigService } from './services/config.service';
import { AudioService } from './services/audio.service';
import { HearingApiService } from './services/hearing-api.service';
import { AudioTestingRealmComponent } from './components/audio-testing-realm/audio-testing-realm.component';
import { CognitionApiService } from './services/cognition-api.service';
import { FooterComponent } from './components/footer/footer.component';
import { ChapterSelectionComponent } from './components/chapter-selection/chapter-selection.component';
import { ProcedureContainerComponent } from './components/procedure-container/procedure-container.component';
import { ProcedureHostDirective } from './directives/procedure-host.directive';
import { DigitTripleTestComponent } from './components/hearing/digit-triple-test/digit-triple-test.component';
import { VisionTestComponent } from './components/vision/vision-test/vision-test.component';
import { CognitionTestComponent } from './components/cognition/cognition-test/cognition-test.component';
import { DigitTripleTestDescriptionComponent } from './components/hearing/digit-triple-test-description/digit-triple-test-description.component';
import { DigitTripleTestResultComponent } from './components/hearing/digit-triple-test-result/digit-triple-test-result.component';
import { HddaResultComponent } from './components/hearing/hdda-result/hdda-result.component';
import { HddaDescriptionComponent } from './components/hearing/hdda-description/hdda-description.component';
import { CognitionTestDescriptionComponent } from './components/cognition/cognition-test-description/cognition-test-description.component';
import { CognitionTestResultComponent } from './components/cognition/cognition-test-result/cognition-test-result.component';
import { IqcodeResultComponent } from './components/cognition/iqcode-result/iqcode-result.component';
import { IqcodeDescriptionComponent } from './components/cognition/iqcode-description/iqcode-description.component';
import { VisionTestResultComponent } from './components/vision/vision-test-result/vision-test-result.component';
import { VisionTestDescriptionComponent } from './components/vision/vision-test-description/vision-test-description.component';
import { Vf14ResultComponent } from './components/vision/vf14-result/vf14-result.component';
import { Vf14DescriptionComponent } from './components/vision/vf14-description/vf14-description.component';
import { VisionChapterDescriptionComponent } from './components/vision/vision-chapter-description/vision-chapter-description.component';
import { CognitionChapterDescriptionComponent } from './components/cognition/cognition-chapter-description/cognition-chapter-description.component';
import { HearingChapterDescriptionComponent } from './components/hearing/hearing-chapter-description/hearing-chapter-description.component';
import { HomeComponent } from './components/home/home.component';
import { IdentificationComponent } from './components/identification/identification.component';
import { ControlCenterComponent } from './components/control-center/control-center.component';
import { FakeResultComponent } from './components/fake-result/fake-result.component';
import { MailApiService } from './services/mail-api.service';
import { ResultParserComponent } from './components/result-parser/result-parser.component';
import { NgInitDirective } from './directives/ng-init.directive';
import { TextInsertPipe } from './pipes/text-insert.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DigitTripleTestComponent,
    FocusDirective,
    VisionTestComponent,
    CheckboxComponent,
    CognitionTestComponent,
    QuestionnaireComponent,
    QuestionComponent,
    DividerComponent,
    PointDisplayComponent,
    NavbarComponent,
    FooterComponent,
    ProgressbarComponent,
    AudioTestingRealmComponent,
    ChapterSelectionComponent,
    ProcedureContainerComponent,
    ProcedureHostDirective,
    DigitTripleTestDescriptionComponent,
    DigitTripleTestResultComponent,
    HddaResultComponent,
    HddaDescriptionComponent,
    CognitionTestDescriptionComponent,
    CognitionTestResultComponent,
    IqcodeResultComponent,
    IqcodeDescriptionComponent,
    VisionTestResultComponent,
    VisionTestDescriptionComponent,
    VisionTestComponent,
    Vf14ResultComponent,
    Vf14DescriptionComponent,
    VisionChapterDescriptionComponent,
    CognitionChapterDescriptionComponent,
    HearingChapterDescriptionComponent,
    HomeComponent,
    IdentificationComponent,
    ControlCenterComponent,
    FakeResultComponent,
    ResultParserComponent,
    NgInitDirective,
    TextInsertPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    LanguageService,
    SettingsService,
    AudioService,
    HearingApiService,
    CognitionApiService,
    ProcedureService,
    IdService,
    TestIdResolver,
    MailApiService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
