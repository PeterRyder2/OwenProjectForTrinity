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
import { VisionTestComponent } from './components/-tests/vision-test/vision-test.component';
import { DigitTripleTestComponent } from './components/-tests/digit-triple-test/digit-triple-test.component';
import { CheckboxComponent } from './components/layout/checkbox/checkbox.component';
import { CognitionTestComponent } from './components/-tests/cognition-test/cognition-test.component';
import { YesOrNoQuestionComponent } from './components/-tests/cognition-test/yes-or-no-question/yes-or-no-question.component';
import { QuestionComponent } from './components/questionnaire/question/question.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { DividerComponent } from './components/layout/divider/divider.component';
import { PointDisplayComponent } from './components/layout/point-display/point-display.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProgressbarComponent } from './components/layout/progressbar/progressbar.component';

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
    YesOrNoQuestionComponent,
    QuestionComponent,
    DividerComponent,
    PointDisplayComponent,
    NavbarComponent,
    ProgressbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    LanguageService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
