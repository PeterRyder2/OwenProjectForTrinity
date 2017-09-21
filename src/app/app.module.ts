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
import { HDDAComponent } from './components/hearing/hdda/hdda.component';
import { VF14Component } from './components/vision/vf14/vf14.component';
import { IQCODEComponent } from './components/cognition/iqcode/iqcode.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChapterSelectionComponent } from './components/chapter-selection/chapter-selection.component';
import { ProcedureContainerComponent } from './components/procedure-container/procedure-container.component';
import { ProcedureHostDirective } from './directives/procedure-host.directive';
import { DescriptionComponent } from './components/description/description.component';
import { DigitTripleTestComponent } from 'app/components/hearing/digit-triple-test/digit-triple-test.component';
import { VisionTestComponent } from 'app/components/vision/vision-test/vision-test.component';
import { CognitionTestComponent } from 'app/components/cognition/cognition-test/cognition-test.component';

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
    HDDAComponent,
    IQCODEComponent,
    VF14Component,
    ChapterSelectionComponent,
    ProcedureContainerComponent,
    ProcedureHostDirective,
    DescriptionComponent
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
    ConfigService,
    AudioService,
    HearingApiService,
    CognitionApiService,
    ProcedureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
