import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VisionTestComponent } from './components/-tests/vision-test/vision-test.component';
import { CognitionTestComponent } from "app/components/-tests/cognition-test/cognition-test.component";
import { DigitTripleTestComponent } from './components/-tests/digit-triple-test/digit-triple-test.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';

const routes: Routes = [
  {
    path: 'Dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/Dashboard',
    pathMatch: 'full'
  },
  {
    path: 'DigitTripleTest',
    component: DigitTripleTestComponent
  },
  {
    path: 'VisionTest',
    component: VisionTestComponent
  },
  {
    path: 'CognitionTest',
    component: CognitionTestComponent
  },
  {
    path: 'Questionnaire',
    component: QuestionnaireComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
