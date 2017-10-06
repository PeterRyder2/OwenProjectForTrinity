import { TestIdResolver } from './services/test-id-resolver.service';
import { IdentificationComponent } from './components/identification/identification.component';
import { ProcedureContainerComponent } from './components/procedure-container/procedure-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { AudioTestingRealmComponent } from './components/audio-testing-realm/audio-testing-realm.component';
import { DigitTripleTestComponent } from './components/hearing/digit-triple-test/digit-triple-test.component';
import { VisionTestComponent } from './components/vision/vision-test/vision-test.component';
import { CognitionTestComponent } from './components/cognition/cognition-test/cognition-test.component';

const routes: Routes = [
  {
    path: 'Dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/Procedure',
    pathMatch: 'full'
  },
  {
    path: 'Procedure',
    component: ProcedureContainerComponent
  },
  {
    path: 'DigitTripleTest',
    component: DigitTripleTestComponent,
    resolve: [TestIdResolver]
  },
  {
    path: 'VisionTest',
    component: VisionTestComponent
  },
  {
    path: 'CognitionTest',
    component: CognitionTestComponent,
    resolve: [TestIdResolver]
  },
  {
    path: 'AudioTestingRealm',
    component: AudioTestingRealmComponent
  },
  {
    path: 'identification/:path',
    component: IdentificationComponent
  },
  {
    path: '**',
    redirectTo: '/Procedure'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
